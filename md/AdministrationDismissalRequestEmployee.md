← Go back to 
[Inventories Module Documentation](/Inventories)


# AdministrationDismissalRequestEmployee.aspx

## Overview

**File**: `\Inventories\Process\AdministrationDismissalRequestEmployee.aspx`
**Purpose**: Employee dismissal request system for inventory items with item selection and quantity management
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, department managers, employee supervisors

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Store Selection (Required for Items)**
- **Store Dropdown**: Must select valid store for item filtering
- **Error Prevention**: System validates store is selected before loading items
- **Data Source**: Inventories_wharehouse_store table linked with procedure rules
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents item loading without store selection
- **Validation**: Only stores with active procedure rules are available

#### 2. **Item Selection (Required for Request)**
- **Item Dropdown**: Must select valid item from available inventory
- **Error Prevention**: System validates item is selected before adding to request
- **Data Source**: Inventories_Item_Settings table with available items
- **Default Behavior**: User must select item manually from dropdown
- **Error Message**: Validation prevents request creation without item selection
- **Validation**: Only items with available quantities are available

#### 3. **Item Type Selection (Required for Request)**
- **Item Type Dropdown**: Must select valid item type for request
- **Error Prevention**: System validates item type is selected before adding to request
- **Data Source**: Inventories_item_type table linked with dispensing rules
- **Default Behavior**: User must select item type manually
- **Error Message**: Validation prevents request creation without item type selection
- **Validation**: Only active item types with proper dispensing rules are available

#### 4. **Quantity Input (Required for Request)**
- **Quantity Field**: Must enter valid quantity for item request
- **Error Prevention**: System validates quantity is greater than 0 and within limits
- **Data Source**: User input with validation against available quantities
- **Default Behavior**: User must enter quantity manually
- **Error Message**: Validation prevents request with zero, negative, or excessive quantity
- **Validation**: Quantity must be positive and not exceed available amount

#### 5. **Need Period Selection (Required for Request)**
- **Need Period Date Picker**: Must select valid need period date
- **Error Prevention**: System validates need period is selected before adding to request
- **Data Source**: User input with date validation
- **Default Behavior**: User must select need period manually
- **Error Message**: Validation prevents request creation without need period selection
- **Validation**: Need period must be valid future date

### Common Error Scenarios and Prevention

#### **Store and Item Errors**
- **Error**: No store selected
- **Prevention**: Always select store before loading items
- **Error**: No item selected
- **Prevention**: Always select item from dropdown before adding to request
- **Error**: Item has no available quantity
- **Prevention**: Check available quantity before adding to request

#### **Item Type and Quantity Errors**
- **Error**: No item type selected
- **Prevention**: Always select item type before adding to request
- **Error**: Zero or negative quantity
- **Prevention**: Always enter positive quantity values
- **Error**: Quantity exceeds available
- **Prevention**: System validates quantity against available amounts

#### **Need Period Errors**
- **Error**: No need period selected
- **Prevention**: Always select need period before adding to request
- **Error**: Invalid need period date
- **Prevention**: Verify need period is valid future date

#### **Request Management Errors**
- **Error**: No items added to request
- **Prevention**: Add at least one item before saving request
- **Error**: Request save fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Item edit fails
- **Prevention**: Select valid item from temporary grid before editing
- **Error**: Item delete fails
- **Prevention**: Select valid item from temporary grid before deleting

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have inventory request permissions** via employee group assignments
3. **Stores must have available items** for request
4. **Item types must be configured** with proper dispensing rules
5. **Request workflow must be enabled** for employee dismissal items

#### **Required System State**
- User authentication must be active
- Inventory request permissions must be configured
- Store data must be current
- Item data must be current
- Item type data must be current
- Request workflow must be enabled

### Success Criteria

#### **For Store Selection**
- ✅ Store dropdown populated with available stores only
- ✅ Store validation ensures proper item filtering
- ✅ Store selection enables item loading

#### **For Item Selection**
- ✅ Item dropdown displays all available items for selected store
- ✅ Item details show complete inventory information
- ✅ Available quantity validation ensures proper limits
- ✅ Unit information displays properly for each item

#### **For Item Type Selection**
- ✅ Item type dropdown displays all available item types
- ✅ Item type validation ensures proper dispensing rules
- ✅ Item type selection enables request creation

#### **For Request Management**
- ✅ Request save creates proper request records
- ✅ Item edit updates items in temporary grid
- ✅ Item delete removes items from temporary grid
- ✅ Request workflow works with proper validation

#### **For Data Management**
- ✅ Temporary request grid refreshes after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on selection and data state

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" Width="100%" ID="BootstrapFormLayout" dir="rtl" LayoutType="Vertical" SettingsItemCaptions-HorizontalAlign="Right">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for employee dismissal request

### Request Header Section

```html
<!-- Request Header -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="رقم الطلب" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="OrderNO" ReadOnly="true"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="نوع الطلب" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="OrderType" Text=" 2 - طلب صرف موظف " ReadOnly="True"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الإدارة" Visible="false" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Dep" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" Enabled="false" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="DepDS" ValueField="DepID" TextField="Dep_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="DepID" />
                            <dx:BootstrapListBoxField FieldName="Dep_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الموظف" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="ResponsableEmp" runat="server" TextFormatString="{0} - {1}" Enabled="false" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="Emp" ValueField="Emp_Code" TextField="User_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="Emp_Code" />
                            <dx:BootstrapListBoxField FieldName="User_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Item Selection Section

```html
<!-- Item Selection -->
<dx:BootstrapLayoutGroup ColSpanMd="12" ShowCaption="False">
    <Items>
        <dx:BootstrapLayoutItem ColSpanMd="12" Caption="المخزن">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="store" runat="server" TextFormatString="{0} - {1}" AutoPostBack="True" EnableMultiColumn="true" EnableCallbackMode="false" DataSourceID="StoreDs" ValueField="code" TextField="arabic_name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="code" />
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="12" Caption="الصنف">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Item" runat="server" TextFormatString="{0} - {1}" AutoPostBack="True" EnableMultiColumn="true" EnableCallbackMode="false" DataSourceID="ItemDS" ValueField="item_code" TextField="arabic_name" OnSelectedIndexChanged="Item_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="item_code" />
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="نوع الصنف" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="DespenseType" Enabled="false" DataSourceID="DespenseTypeDS" TextField="english_name" ValueField="id" OnSelectedIndexChanged="DespenseType_SelectedIndexChanged" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="false"></dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الوحدة">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="Unit" ReadOnly="true"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الكمية">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapSpinEdit runat="server" ID="Quentity" AllowMouseWheel="false"></dx:BootstrapSpinEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="مدة الاحتياج">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapDateEdit runat="server" ID="Period" OnCalendarDayCellPrepared="Period_CalendarDayCellPrepared"></dx:BootstrapDateEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="كمية الصنف">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox ID="txtquantity" runat="server" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="4" Caption=" ">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="float: left; color: white; background-color: white">
                        <dx:BootstrapButton runat="server" Text="  اضافة الصنف" ID="BTN_ADD" OnClick="BTN_ADD_Click" CssClasses-Control="cc">
                            <CssClasses Icon="simple-icon-plus" />
                            <SettingsBootstrap RenderOption="Info" />
                        </dx:BootstrapButton>
                        <dx:BootstrapButton runat="server" Text="  تعديل  الصنف" ID="BTN_Edit_Temp" OnClick="BTN_Edit_Temp_Click" CssClasses-Control="cc">
                            <CssClasses Icon="simple-icon-note" />
                            <SettingsBootstrap RenderOption="Dark" />
                        </dx:BootstrapButton>
                        <dx:BootstrapButton runat="server" Text=" حذف الصنف " ID="BTN_Delete_Temp" OnClick="BTN_Delete_Temp_Click" CssClasses-Control="cc">
                            <CssClasses Icon="simple-icon-trash" />
                            <SettingsBootstrap RenderOption="Danger" />
                        </dx:BootstrapButton>
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Temporary Request Grid Section

```html
<!-- Temporary Request Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="tempItems" AutoPostBack="true" ClientInstanceName="tempItems" KeyFieldName="id" DataSourceID="TempItemsDS" OnSelectionChanged="tempItems_SelectionChanged" ShowHeaderWhenEmpty="True" runat="server" Width="100%" SettingsBehavior-AllowSelectSingleRowOnly="true" AutoGenerateColumns="False" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true">
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
                <Settings ShowFilterRow="true" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="true"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="id" Caption="Code" ReadOnly="True" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Discription" Caption="نوع الصنف" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Item_Type_id" Caption="نوع الصنف" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_code" Caption="نوع الصنف" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="اسم الصنف" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Quntity" Caption="الكمية" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewDateColumn FieldName="Due_Date" Caption="مدة الاحتياج" VisibleIndex="1"></dx:BootstrapGridViewDateColumn>
                </Columns>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" AutoExpandAllGroups="false"></SettingsBehavior>
                <SettingsDetail ExportMode="All" />
                <SettingsDataSecurity AllowDelete="False" AllowInsert="False" AllowEdit="False" />
                <TotalSummary>
                    <dx:ASPxSummaryItem FieldName="arabic_name" SummaryType="Count" DisplayFormat="عدد الاصناف =  {0 }" />
                    <dx:ASPxSummaryItem FieldName="Quntity" SummaryType="Sum" DisplayFormat="كمية الاصناف =  {0 }" />
                </TotalSummary>
                <Settings ShowFooter="True" />
                <Settings VerticalScrollableHeight="350" />
                <SettingsPager PageSize="10">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Request Save Section

```html
<!-- Request Save -->
<dx:BootstrapLayoutItem ColSpanMd="12" ShowCaption="False">
    <ContentCollection>
        <dx:ContentControl>
            <div style="float: left">
                <dx:BootstrapButton runat="server" Text=" حفظ الطلب" ID="BTN_Save" OnClick="BTN_Save_Click">
                    <CssClasses Icon="simple-icon-envelope" />
                    <SettingsBootstrap RenderOption="Success" />
                </dx:BootstrapButton>
                <dx:BootstrapButton runat="server" Text=" تعديل الطلب" ID="Edit" OnClick="Edit_Click">
                    <CssClasses Icon="simple-icon-envelope-letter" />
                    <SettingsBootstrap RenderOption="Dark" />
                </dx:BootstrapButton>
                <dx:BootstrapButton runat="server" Text=" حذف الطلب " ID="BTN_Delete" OnClick="BTN_Delete_Click">
                    <CssClasses Icon="simple-icon-trash" />
                    <SettingsBootstrap RenderOption="Danger" />
                </dx:BootstrapButton>
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Request History Section

```html
<!-- Request History -->
<dx:BootstrapLayoutItem ShowCaption="false" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="ItemsHisroy" runat="server" AutoGenerateColumns="false" AutoPostBack="true" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" OnSelectionChanged="ItemsHisroy_SelectionChanged" KeyFieldName="id" DataSourceID="ItemHis">
                <Settings ShowFilterRow="true" ShowHeaderFilterButton="true" />
                <SettingsPager PageSize="6" Mode="ShowPager" NumericButtonCount="10">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <Columns>
                    <dx:BootstrapGridViewCommandColumn ShowSelectCheckbox="True" VisibleIndex="0"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="id" Caption="id" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="OrderNo" Caption="رقم طلب الصرف" VisibleIndex="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Date" Caption="التاريخ" VisibleIndex="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Time" Caption="الوقت" VisibleIndex="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Emp2" Caption=" الموظف" VisibleIndex="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Emp" Caption=" الموظف" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="arabic_name" Caption=" المخزن"></dx:BootstrapGridViewDataColumn>
                </Columns>
                <SettingsDetail ShowDetailRow="true" AllowOnlyOneMasterRowExpanded="true" />
                <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                <Templates>
                    <DetailRow>
                        <dx:BootstrapGridView ID="Detaiiils" runat="server" KeyFieldName="ID" DataSourceID="ItemHisDetails" OnBeforePerformDataSelect="Detaiiils_BeforePerformDataSelect">
                            <Columns>
                                <dx:BootstrapGridViewDataColumn FieldName="id" Caption="id" Visible="false"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="arabic_name" Caption="اسم الصنف"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="Discription" Caption="نوع الصنف"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="UNIT" Caption="الوحدة"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="Quntity" Caption="الكمية"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="Due_Date" Caption="مدة الاحتياج"></dx:BootstrapGridViewDataColumn>
                            </Columns>
                            <ClientSideEvents DetailRowCollapsing="MasterGrid_DetailRowCollapsing" EndCallback="MasterGrid_EndCallback" />
                        </dx:BootstrapGridView>
                    </DetailRow>
                </Templates>
                <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
                <ClientSideEvents DetailRowCollapsing="MasterGrid_DetailRowCollapsing" EndCallback="MasterGrid_EndCallback" />
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Delete Confirmation Popup

```html
<!-- Delete Confirmation Popup -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapPopupControl runat="server" ID="PatientType" SettingsBootstrap-Sizing="Large" Width="800" ShowCloseButton="true" Modal="true" HeaderText="تنبية" ClientInstanceName="popup" ShowHeader="true" ShowFooter="false" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" CloseAction="CloseButton">
                <SettingsAdaptivity Mode="OnWindowInnerWidth" />
                <ContentCollection>
                    <dx:ContentControl>
                        <dx:BootstrapFormLayout ID="BootstrapFormLayout9" runat="server">
                            <Items>
                                <dx:BootstrapLayoutGroup ShowCaption="false">
                                    <CssClasses GroupContent="bg-light text-dark" />
                                    <Items>
                                        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12" HorizontalAlign="Right">
                                            <ContentCollection>
                                                <dx:ContentControl>
                                                    <dx:ASPxLabel ForeColor="Red" Font-Bold="true" Font-Size="Large" Text="هل انت متأكد من حذف طلب الصرف ؟" ID="MSG" runat="server" Width="100%"></dx:ASPxLabel>
                                                </dx:ContentControl>
                                            </ContentCollection>
                                        </dx:BootstrapLayoutItem>
                                        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
                                            <ContentCollection>
                                                <dx:ContentControl>
                                                    <dx:BootstrapButton runat="server" ID="Yes" OnClick="Yes_Click" Width="50%" Text="تأكيد الحذف">
                                                        <SettingsBootstrap RenderOption="Success" />
                                                    </dx:BootstrapButton>
                                                </dx:ContentControl>
                                            </ContentCollection>
                                        </dx:BootstrapLayoutItem>
                                        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
                                            <ContentCollection>
                                                <dx:ContentControl>
                                                    <dx:BootstrapButton runat="server" ID="No" OnClick="No_Click" Width="50%" Text="إلغاء">
                                                        <SettingsBootstrap RenderOption="Danger" />
                                                    </dx:BootstrapButton>
                                                </dx:ContentControl>
                                            </ContentCollection>
                                        </dx:BootstrapLayoutItem>
                                    </Items>
                                </dx:BootstrapLayoutGroup>
                            </Items>
                        </dx:BootstrapFormLayout>
                    </dx:ContentControl>
                </ContentCollection>
            </dx:BootstrapPopupControl>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**User Context Parameters**:
- `@emp` - Employee code for filtering stores and permissions
- `@user` - Username for filtering temporary request records
- `@date` - Date for filtering temporary records

**Store Parameters**:
- `@store` - Store ID for filtering items

**Item Parameters**:
- `@code` - Item code for batch selection
- `@store` - Store ID for batch selection

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Store Selection**: Loads items based on selected store
3. **Item Selection**: Loads item information for selected item
4. **Item Type Selection**: Loads item type information
5. **Request Creation**: Adds items to temporary request grid
6. **Request Save**: Creates complete request records
7. **Request History**: Loads previous requests for user

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication cookies
2. Auto-populates department and employee information
3. Disables readonly fields appropriately
4. Sets default request state

### Item_SelectedIndexChanged Method

```csharp
protected void Item_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads item information for selected item

**Process**:
1. Validates item selection
2. Retrieves item details from database
3. Updates item information display
4. Clears item type selection

### BTN_ADD_Click Method

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
```

**Purpose**: Adds item to temporary request grid

**Process**:
1. Validates all required fields are filled
2. Validates quantity is greater than 0
3. Validates need period is selected
4. Checks item availability
5. Inserts item into temporary table
6. Refreshes temporary request grid
7. Clears form fields for next addition

### BTN_Edit_Temp_Click Method

```csharp
protected void BTN_Edit_Temp_Click(object sender, EventArgs e)
```

**Purpose**: Edits item in temporary request grid

**Process**:
1. Validates item selection
2. Retrieves item details from temporary grid
3. Updates item information in temporary table
4. Refreshes temporary request grid
5. Clears form fields

### BTN_Delete_Temp_Click Method

```csharp
protected void BTN_Delete_Temp_Click(object sender, EventArgs e)
```

**Purpose**: Deletes item from temporary request grid

**Process**:
1. Validates item selection
2. Deletes item from temporary table
3. Refreshes temporary request grid
4. Clears form fields

### BTN_Save_Click Method

```csharp
protected void BTN_Save_Click(object sender, EventArgs e)
```

**Purpose**: Saves complete request

**Process**:
1. Validates at least one item is added
2. Generates new request document number
3. Inserts request header record
4. Inserts all temporary items as details
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

### Edit_Click Method

```csharp
protected void Edit_Click(object sender, EventArgs e)
```

**Purpose**: Edits existing request

**Process**:
1. Validates request selection
2. Loads request details from database
3. Updates request header record
4. Updates all request items as details
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

### BTN_Delete_Click Method

```csharp
protected void BTN_Delete_Click(object sender, EventArgs e)
```

**Purpose**: Deletes existing request

**Process**:
1. Validates request selection
2. Shows delete confirmation popup
3. Deletes request header record
4. Deletes all request items
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

### Yes_Click Method

```csharp
protected void Yes_Click(object sender, EventArgs e)
```

**Purpose**: Confirms request deletion

**Process**:
1. Validates request selection
2. Deletes request header record
3. Deletes all request items
4. Clears temporary tables
5. Refreshes all grids and controls
6. Hides delete confirmation popup
7. Provides success feedback

### No_Click Method

```csharp
protected void No_Click(object sender, EventArgs e)
```

**Purpose**: Cancels request deletion

**Process**:
1. Hides delete confirmation popup
2. Maintains current request state
3. Allows user to continue editing

## Database Integration

### Core Database Tables

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, active
- **Usage**: Provides store list for item filtering
- **Filtering**: Only stores with active procedure rules

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, active
- **Usage**: Provides item information for display
- **Filtering**: Only active items with available quantities

#### **Inventories_item_type**
- **Purpose**: Item type master data
- **Key Fields**: id, english_name, active
- **Usage**: Provides item type list for filtering
- **Filtering**: Only active item types with proper dispensing rules

#### **Inventories_Dispense_Request_Details_Temp**
- **Purpose**: Temporary request records before save
- **Key Fields**: id, Item_Type_id, item_code, Quntity, Due_Date, username, date, Type
- **Usage**: Tracks request items before request save

#### **Inventories_Dispense_Request_Header**
- **Purpose**: Request header records
- **Key Fields**: id, OrderNo, OrderType, Date, Time, Emp, Dep, store_id, Active, Approval, closed, Status
- **Usage**: Tracks request headers with approval workflow

#### **Inventories_Dispense_Request_Details**
- **Purpose**: Request detail records
- **Key Fields**: id, header_fk, Item_Type_id, item_code, Quntity, Due_Date
- **Usage**: Tracks request items after request save

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description
- **Usage**: Provides unit information for items

#### **Inventories_Dispens**
- **Purpose**: Dispensing rules master data
- **Key Fields**: id, fk_item_type, fk_disp_type, active
- **Usage**: Provides dispensing rules for item types

#### **Inventories_rules_items_type**
- **Purpose**: Item type rules master data
- **Key Fields**: Items_Type_id, emp_id, active
- **Usage**: Provides item type rules for employees

#### **Inventories_Procedures_Stores_DTL**
- **Purpose**: Procedure stores detail data
- **Key Fields**: Setup_Procedure_Stores_FK, Stores_Code, Active
- **Usage**: Provides store procedure rules

#### **Inventories_Procedures_Stores_HD**
- **Purpose**: Procedure stores header data
- **Key Fields**: ID, Setup_Procedure_FK
- **Usage**: Provides store procedure rules

#### **Users**
- **Purpose**: User master data with employee codes
- **Key Fields**: Emp_Code, User_Name, Active
- **Usage**: Provides user list for employee selection
- **Filtering**: Excludes system users ('0', '00')

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
ResponsableEmp.Value = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing request operations

#### **Department Assignment**
```csharp
Dep.Value = cn.ExcuteSQL2("SELECT DepID,Dep_Name FROM DefinitionDep WHERE DepID in (SELECT top 1 EmpDepartment FROM DefinitionEmployee1 WHERE(EmpID = N'" + userinfo["code"].ToString() + "'))");
```

**Department Logic**: Auto-populates department based on user's employee record
**Validation**: Ensures user has valid department assignment
**Usage**: Provides context for request operations

#### **Store Filtering**
```sql
SELECT WS.id as code, arabic_name
FROM Inventories_wharehouse_store WS 
WHERE (WS.active = 1) and WS.id in (select ws.id 
from Inventories_Procedures_Stores_DTL sd  
inner join Inventories_Procedures_Stores_HD sh on sd.Setup_Procedure_Stores_FK =sh.ID  
inner join Inventories_wharehouse_store ws on ws.id = sd.Stores_Code
where sd.Active =1 and sh.Setup_Procedure_FK = 3)
```

**Filtering Logic**: Shows only stores with active procedure rules
**Permission Logic**: Only stores with active procedure rules are available
**Validation**: Ensures store has request items

## Client-Side JavaScript

### Master-Detail Grid Handling

```javascript
function MasterGrid_DetailRowCollapsing(s, e) {
    var key = masterGrid.GetRowKey(e.visibleIndex);
    hf.Set('collapsedRowKey', key);
}
function MasterGrid_EndCallback(s, e) {
    if (hf.Contains('collapsedRowKey'))
        hf.Remove('collapsedRowKey');
}
```

**Grid Features**: Master-detail grid functionality with collapsible rows
**State Management**: Client-side state management for collapsed rows
**Server Integration**: Coordinates with server-side event handling

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Request Header Section**
```html
<!-- Request Header -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="رقم الطلب" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="نوع الطلب" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="الإدارة" Visible="false" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="الموظف" ColSpanMd="3">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Item Selection Section**
```html
<!-- Item Selection -->
<dx:BootstrapLayoutGroup ColSpanMd="12" ShowCaption="False">
    <Items>
        <dx:BootstrapLayoutItem ColSpanMd="12" Caption="المخزن">
        <dx:BootstrapLayoutItem ColSpanMd="12" Caption="الصنف">
        <dx:BootstrapLayoutItem Caption="نوع الصنف" ColSpanMd="12">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الوحدة">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الكمية">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="مدة الاحتياج">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="كمية الصنف">
        <dx:BootstrapLayoutItem ColSpanMd="4" Caption=" ">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **3. Temporary Request Grid Section**
```html
<!-- Temporary Request Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="tempItems" runat="server" OnSelectionChanged="tempItems_SelectionChanged">
```

#### **4. Request Save Section**
```html
<!-- Request Save -->
<dx:BootstrapLayoutItem ColSpanMd="12" ShowCaption="False">
    <ContentCollection>
        <dx:ContentControl>
            <div style="float: left">
                <dx:BootstrapButton ID="BTN_Save" runat="server" OnClick="BTN_Save_Click">
                <dx:BootstrapButton ID="Edit" runat="server" OnClick="Edit_Click">
                <dx:BootstrapButton ID="BTN_Delete" runat="server" OnClick="BTN_Delete_Click">
            </div>
```

#### **5. Request History Section**
```html
<!-- Request History -->
<dx:BootstrapLayoutItem ShowCaption="false" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="ItemsHisroy" runat="server" OnSelectionChanged="ItemsHisroy_SelectionChanged">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Store Data Source
SqlDataSource StoreDs = new SqlDataSource();
StoreDs.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
StoreDs.SelectCommand = "SELECT WS.id as code,arabic_name FROM Inventories_wharehouse_store WS WHERE (WS.active = 1) and WS.id in (select ws.id from Inventories_Procedures_Stores_DTL sd inner join Inventories_Procedures_Stores_HD sh on sd.Setup_Procedure_Stores_FK =sh.ID inner join Inventories_wharehouse_store ws on ws.id = sd.Stores_Code where sd.Active =1 and sh.Setup_Procedure_FK = 3)";

// Item Data Source
SqlDataSource ItemDS = new SqlDataSource();
ItemDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
ItemDS.SelectCommand = "select distinct Inventories_Item_Settings.arabic_name as arabic_name, storeBalance_withbatch_no.item_code as item_code from storeBalance_withbatch_no inner join Inventories_Item_Settings on storeBalance_withbatch_no.item_code=Inventories_Item_Settings.item_code where (active = 1) and storeid = @store and Item_Type_id in (SELECT distinct Inventories_item_type.id FROM Inventories_item_type inner join Inventories_Dispens on Inventories_item_type.id = fk_item_type inner Join Inventories_rules_items_type on Inventories_rules_items_type.Items_Type_id = Inventories_item_type.id where fk_disp_type = 2 and (Inventories_item_type.active = '1') and item_level ='3' and Inventories_rules_items_type.active=1 and Inventories_Dispens.active =1 and Inventories_rules_items_type.emp_id=@emp) group by Inventories_Item_Settings.arabic_name, storeBalance_withbatch_no.item_code having (SUM(remain) ) > 0 union SELECT arabic_name, item_code FROM Inventories_Item_Settings inner join Inventories_Stock_Saving on Inventories_Stock_Saving.Itemcode = Inventories_Item_Settings.item_code WHERE (active = 1) and storeid = @store and MoveType = 13 and Item_Type_id in (SELECT distinct Inventories_item_type.id FROM Inventories_item_type inner join Inventories_Dispens on Inventories_item_type.id = fk_item_type inner Join Inventories_rules_items_type on Inventories_rules_items_type.Items_Type_id = Inventories_item_type.id where fk_disp_type = 2 and (Inventories_item_type.active = '1') and item_level ='3' and Inventories_rules_items_type.active=1 and Inventories_Dispens.active =1 and Inventories_rules_items_type.emp_id=@emp) group by arabic_name, item_code having (SUM(Quantity_Exchange) - SUM(Amount_Done_Exchange) ) > 0";

// Item Type Data Source
SqlDataSource DespenseTypeDS = new SqlDataSource();
DespenseTypeDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
DespenseTypeDS.SelectCommand = "SELECT distinct Inventories_item_type.id, english_name FROM Inventories_item_type inner join Inventories_Dispens on Inventories_item_type.id = fk_item_type inner Join Inventories_rules_items_type on Inventories_rules_items_type.Items_Type_id = Inventories_item_type.id where fk_disp_type = 2 and (Inventories_item_type.active = '1') and item_level ='3' and Inventories_rules_items_type.active=1 and Inventories_Dispens.active =1";

// Temporary Request Data Source
SqlDataSource TempItemsDS = new SqlDataSource();
TempItemsDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
TempItemsDS.SelectCommand = "SELECT Temp.Item_Type_id,Temp.id, IIS.arabic_name,ISett.arabic_name Discription,IIS.item_code, IIS.item_code, Quntity, Due_Date, username, date FROM Inventories_Dispense_Request_Details_Temp Temp inner join Inventories_Item_Settings IIS on IIS.item_code = Temp.item_code inner join Inventories_item_type ISett on ISett.id = Temp.Item_Type_id WHERE username = @user and date =@date and Type=2";

// Request History Data Source
SqlDataSource ItemHis = new SqlDataSource();
ItemHis.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
ItemHis.SelectCommand = "SELECT h.id, OrderNo, OrderType, Date, Time, (select User_Name from Users where Emp_Code=convert(nvarchar,Emp)) Emp2,Emp,Dep,(select arabic_name from Inventories_wharehouse_store where id=store_id) as arabic_name FROM Inventories_Dispense_Request_Header h where Emp=@emp and Active = 1 and OrderType=2 and Approval=0 and closed=0 and Status='a'";
```

## Business Logic and Validation

### Store and Item Validation

```csharp
protected void Item_SelectedIndexChanged(object sender, EventArgs e)
{
    if (store.Value == "" || store.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المخزن');", true);
        return;
    }
    // ... additional validation
}
```

**Store Logic**: Validates store selection before loading items
**Item Logic**: Validates item selection before adding to request
**Error Prevention**: Prevents item loading without proper store and item context

### Item Type Validation

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
{
    if (DespenseType.Value == "" || DespenseType.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار نوع الصنف');", true);
        return;
    }
    // ... additional validation
}
```

**Item Type Logic**: Validates item type selection before adding to request
**Error Prevention**: Prevents request creation without proper item type selection

### Quantity Validation

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
{
    if (Convert.ToDouble(Quentity.Text) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال الكمية');", true);
        return;
    }
    else if (Convert.ToDouble(Quentity.Text) > Convert.ToDouble(txtquantity.Text))
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الكمية المدخلة اكبر من الكمية المتاحة');", true);
        return;
    }
    // ... additional validation
}
```

**Quantity Logic**: Validates quantity is positive and within limits
**Availability Logic**: Validates quantity does not exceed available amount
**Error Prevention**: Prevents request with invalid quantity

### Need Period Validation

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
{
    if (Period.Text == "" || Period.Text == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال مدة الاحتياج');", true);
        return;
    }
    // ... additional validation
}
```

**Need Period Logic**: Validates need period is selected before adding to request
**Error Prevention**: Prevents request creation without proper need period selection

### Request Save Validation

```csharp
protected void BTN_Save_Click(object sender, EventArgs e)
{
    if (tempItems.VisibleRowCount == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('لا يوجد اصناف مضافة');", true);
        return;
    }
    // ... save logic
}
```

**Request Logic**: Validates at least one item is added before saving
**Empty Logic**: Prevents saving empty requests
**Error Prevention**: Ensures request has proper content before processing

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Store Selection Validation**: Must select store before loading items
- **Item Selection Validation**: Must select item from dropdown before adding to request
- **Item Type Selection Validation**: Must select item type before adding to request
- **Quantity Validation**: Must enter positive quantity within limits
- **Need Period Validation**: Must select need period before adding to request

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Store Validation**: Ensures store has active procedure rules
- **Item Availability Validation**: Ensures items have available quantities
- **Item Type Validation**: Ensures item type has proper dispensing rules
- **Quantity Validation**: Ensures quantities are within allowed limits
- **Need Period Validation**: Ensures need period is valid future date

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Store Access**: Ensures user has access to selected store
- **Request Access**: Ensures user can access and modify request records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Item Addition Success**: "تم اضافة الصنف" (Item added successfully)
- **Item Edit Success**: "تم تعديل الصنف" (Item edited successfully)
- **Item Delete Success**: "تم حذف الصنف" (Item deleted successfully)
- **Request Save Success**: "تم حفظ طلب الصرف" (Request saved successfully)
- **Request Edit Success**: "تم تعديل طلب الصرف" (Request edited successfully)
- **Request Delete Success**: "تم حذف طلب الصرف" (Request deleted successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of temporary request grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Request Management System**
- **Database Tables**:
  - `Inventories_Dispense_Request_Details_Temp` - Temporary request records before save
  - `Inventories_Dispense_Request_Header` - Request header records
  - `Inventories_Dispense_Request_Details` - Request detail records
- **Integration Details**:
  - Request workflow controlled by store and item selection
  - Request quantities tracked against available amounts
  - Temporary records stored before request save
- **Data Flow**:
  - Items filtered by store and available quantities
  - Request quantities validated against available limits
  - Temporary records stored for request save

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
  - **Department Assignment**: Retrieved via SQL query on DefinitionEmployee1 table
- **Database Tables**:
  - `DefinitionDep` table with fields: DepID, Dep_Name
  - `DefinitionEmployee1` table with fields: EmpID, EmpDepartment
  - Connection string: `BackOffice_CS`
- **Permission System**:
  - Department-based access control enforced at database level
  - User authentication required for all request operations
  - Department auto-population based on user profile

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
  - `Inventories_Stock_Saving` - Stock saving records
- **Integration Details**:
  - Item information displayed for request selection
  - Store availability tracked with batch-level detail
  - Unit information calculated based on item associations
- **Data Flow**:
  - Item details loaded from item master data
  - Store information loaded from store master data
  - Unit information calculated from unit associations

### Data Exchange

#### **Store and Item Information**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Item_Settings` - Item master data
- **Real-time Data**:
  - Store information for item filtering
  - Item information for request
  - Item quantities and availability
- **Data Relationships**:
  - Stores linked to items via stock records
  - Items linked to types via item type associations
  - Temporary records cleared after request save

#### **Item and Type Information**
- **Database Tables**:
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
  - `Inventories_item_type` - Item type master data
- **Real-time Data**:
  - Item details and descriptions
  - Unit information and calculations
  - Item type information and rules
- **Data Relationships**:
  - Items linked to types and units
  - Unit information calculated from unit associations
  - Item type information displayed for request items

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: Store not selected before loading items
- **Solution**: Always select store before loading items
- **Prevention**: Store selection is required for all request operations

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: Item not selected from dropdown before adding to request
- **Solution**: Always select item from dropdown before adding to request
- **Prevention**: Item selection is required for all request operations

#### **"الرجاء اختيار نوع الصنف" Error**
- **Cause**: Item type not selected before adding to request
- **Solution**: Always select item type before adding to request
- **Prevention**: Item type selection is required for all request operations

#### **"الرجاء ادخال الكمية" Error**
- **Cause**: Quantity not entered or zero/negative
- **Solution**: Always enter positive quantity
- **Prevention**: Quantity must be greater than 0

#### **"الكمية المدخلة اكبر من الكمية المتاحة" Error**
- **Cause**: Quantity exceeds available amount
- **Solution**: Enter quantity within available limit
- **Prevention**: System validates quantity against available amounts

#### **"الرجاء ادخال مدة الاحتياج" Error**
- **Cause**: Need period not selected before adding to request
- **Solution**: Always select need period before adding to request
- **Prevention**: Need period selection is required for all request operations

#### **"لا يوجد اصناف مضافة" Error**
- **Cause**: No items added to request before saving
- **Solution**: Add at least one item before saving
- **Prevention**: Request must have items before saving

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Request Access**: Access to request operations
- **Store Access**: Access to stores with request items
- **Item Access**: Access to items with available quantities

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Request Workflow**: Understanding of request process
- **Store Management**: Knowledge of store selection and item filtering
- **Item Management**: Familiarity with item selection and quantity management
- **Request Management**: Understanding of request save, edit, and delete operations

## Usage Examples

### Basic Request Workflow

1. **Page Load**: Verify department and employee are auto-selected
2. **Store Selection**: Select store for request
3. **Item Selection**: Select item from available items dropdown
4. **Item Type Selection**: Select item type for request
5. **Quantity Entry**: Enter request quantity within limits
6. **Need Period Selection**: Select need period date
7. **Item Addition**: Click add button to add item to temporary request grid
8. **Repeat Items**: Add additional request items as needed
9. **Request Save**: Click save button to create complete request

### Request Item Management Workflow

1. **Store Selection**: Select store for request
2. **Item Selection**: Select item from available items dropdown
3. **Item Type Selection**: Select item type for request
4. **Quantity Entry**: Enter request quantity within limits
5. **Need Period Selection**: Select need period date
6. **Item Addition**: Add item to temporary request grid
7. **Item Review**: Review items in temporary request grid
8. **Item Edit**: Edit items in temporary request grid
9. **Item Delete**: Remove items from temporary request grid
10. **Request Completion**: Save request with all validated items

### Multi-Item Request Management

1. **Store Selection**: Select store for request
2. **Item Review**: Review all available items for selected store
3. **Selective Request**: Add specific items as needed
4. **Quantity Management**: Manage request quantities for each item
5. **Need Period Management**: Manage need periods for each item
6. **Request Validation**: Ensure all items have proper validation
7. **Request Save**: Save request with all validated items