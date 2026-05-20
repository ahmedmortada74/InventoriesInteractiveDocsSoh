← Go back to 
[Inventories Module Documentation](/Inventories)

# AdministrationDismissalRequestPatientDose.aspx

## Overview

**File**: `\Inventories\Process\AdministrationDismissalRequestPatientDose.aspx`
**Purpose**: Patient dose dismissal request system for pharmacy items with prescription-based workflow
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Pharmacists, pharmacy staff, medication dispensing personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Patient Selection (Required for Dispensing)**
- **Patient Dropdown**: Must select valid patient for medication dispensing
- **Error Prevention**: System validates patient is selected before loading prescriptions
- **Data Source**: Patient_information table with active patients
- **Default Behavior**: User must select patient manually
- **Error Message**: Validation prevents prescription loading without patient selection
- **Validation**: Only patients with active visits are available

#### 2. **Date Range Selection (Required for Filtering)**
- **From Date**: Must select valid start date for prescription filtering
- **To Date**: Must select valid end date for prescription filtering
- **Error Prevention**: System validates date range is selected before loading prescriptions
- **Data Source**: User input with date validation
- **Default Behavior**: User must select date range manually
- **Error Message**: Validation prevents prescription loading without date selection
- **Validation**: Date range must be valid and within reasonable limits

#### 3. **Department Selection (Required for Filtering)**
- **Department Dropdown**: Must select valid department for prescription filtering
- **Error Prevention**: System validates department is selected before loading prescriptions
- **Data Source**: Static dropdown with Day Care, In-Patient, Out-Patient options
- **Default Behavior**: User must select department manually
- **Error Message**: Validation prevents prescription loading without department selection
- **Validation**: Only valid department types are available

#### 4. **Store Selection (Required for Items)**
- **Store Dropdown**: Must select valid store for item filtering
- **Error Prevention**: System validates store is selected before loading items
- **Data Source**: Inventories_wharehouse_store table linked with store rules
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents item loading without store selection
- **Validation**: Only stores with available items are available

#### 5. **Item Selection (Required for Dispensing)**
- **Item Dropdown**: Must select valid item from available medications
- **Error Prevention**: System validates item is selected before dispensing
- **Data Source**: Inventories_Item_Settings table with available medications
- **Default Behavior**: User must select item manually from dropdown
- **Error Message**: Validation prevents dispensing without item selection
- **Validation**: Only items with available quantities are available

#### 6. **Quantity Input (Required for Dispensing)**
- **Quantity Field**: Must enter valid quantity for dispensing
- **Error Prevention**: System validates quantity is greater than 0 and within limits
- **Data Source**: User input with validation against available quantities
- **Default Behavior**: User must enter quantity manually
- **Error Message**: Validation prevents dispensing with zero, negative, or excessive quantity
- **Validation**: Quantity must be positive and not exceed available amount

#### 7. **Need Period Selection (Required for Dispensing)**
- **Need Period Date Picker**: Must select valid need period date
- **Error Prevention**: System validates need period is selected before adding to dispensing
- **Data Source**: User input with date validation
- **Default Behavior**: User must select need period manually
- **Error Message**: Validation prevents dispensing without need period selection
- **Validation**: Need period must be valid future date

### Common Error Scenarios and Prevention

#### **Patient and Date Errors**
- **Error**: No patient selected
- **Prevention**: Always select patient before loading prescriptions
- **Error**: No date range selected
- **Prevention**: Always select date range before loading prescriptions
- **Error**: Invalid date range
- **Prevention**: Verify from date is before to date

#### **Department and Store Errors**
- **Error**: No department selected
- **Prevention**: Always select department before loading prescriptions
- **Error**: No store selected
- **Prevention**: Always select store before loading items
- **Error**: Store has no available items
- **Prevention**: Verify store has items with available quantities

#### **Item Selection Errors**
- **Error**: No item selected
- **Prevention**: Always select item from dropdown before dispensing
- **Error**: Item has no available quantity
- **Prevention**: Check available quantity before dispensing
- **Error**: Item already fully dispensed
- **Prevention**: Verify item has remaining quantity

#### **Quantity and Need Period Errors**
- **Error**: Zero or negative quantity
- **Prevention**: Always enter positive quantity values
- **Error**: Quantity exceeds available
- **Prevention**: System validates quantity against available amounts
- **Error**: Quantity exceeds prescription
- **Prevention**: System validates quantity against prescription limits
- **Error**: No need period selected
- **Prevention**: Always select need period before adding to dispensing

#### **Dispensing Management Errors**
- **Error**: No items added to dispensing
- **Prevention**: Add at least one item before saving
- **Error**: Dispensing save fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Item edit fails
- **Prevention**: Select valid item from temporary grid before editing
- **Error**: Item delete fails
- **Prevention**: Select valid item from temporary grid before deleting

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have pharmacy dispensing permissions** via employee group assignments
3. **Patients must have active visits** in the system
4. **Stores must have available medications** for dispensing
5. **Prescriptions must be active** with proper status
6. **Dispensing workflow must be enabled** for pharmacy items

#### **Required System State**
- User authentication must be active
- Pharmacy dispensing permissions must be configured
- Patient data must be current
- Store data must be current
- Prescription data must be current
- Item inventory data must be current
- Dispensing workflow must be enabled

### Success Criteria

#### **For Patient and Date Selection**
- ✅ Patient dropdown populated with active patients only
- ✅ Date range validation ensures proper prescription filtering
- ✅ Patient validation prevents prescription loading without selection
- ✅ Date validation ensures proper date range

#### **For Department Selection**
- ✅ Department dropdown populated with Day Care, In-Patient, Out-Patient options
- ✅ Department validation ensures proper prescription filtering
- ✅ Department selection enables prescription loading

#### **For Store Selection**
- ✅ Store dropdown populated with available stores only
- ✅ Store validation ensures proper item filtering
- ✅ Store selection enables item loading

#### **For Item Selection**
- ✅ Item dropdown displays all available medications for selected store
- ✅ Item details show complete prescription information
- ✅ Available quantity validation ensures proper limits
- ✅ Unit information displays properly for each item

#### **For Dispensing Management**
- ✅ Dispensing save creates proper dispensing records
- ✅ Item edit updates items in temporary grid
- ✅ Item delete removes items from temporary grid
- ✅ Dispensing workflow works with proper validation

#### **For Data Management**
- ✅ Temporary dispensing grid refreshes after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on selection and data state

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" Width="100%" ID="BootstrapFormLayout" dir="rtl" LayoutType="Vertical" SettingsItemCaptions-HorizontalAlign="Right">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for patient dose dispensing

### Request Header Section

```html
<!-- Request Header -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="رقم الطلب" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="OrderNO" ReadOnly="true"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="نوع الطلب" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="OrderType" Text=" 8 - صرف علي مريض صيدلية  " ReadOnly="True"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الإدارة" ColSpanMd="3">
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
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display:flex; justify-content:space-between">
                        <dx:BootstrapDateEdit runat="server" ID="from" AutoPostBack="true" Caption="من" Width="45%"></dx:BootstrapDateEdit>
                        <dx:BootstrapDateEdit runat="server" ID="to" AutoPostBack="true" Caption="إلى" Width="45%"></dx:BootstrapDateEdit>
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الملف الطبي" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Patient" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" Enabled="true" OnSelectedIndexChanged="Patient_SelectedIndexChanged" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="PatientDS" ValueField="FileId" TextField="Patient_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="FileId" />
                            <dx:BootstrapListBoxField FieldName="Patient_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="القسم" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="OrderDep" runat="server" Enabled="true">
                        <Items>
                            <dx:BootstrapListEditItem Text="Day Care" Value="DC"></dx:BootstrapListEditItem>
                            <dx:BootstrapListEditItem Text="In-Patient" Value="In"></dx:BootstrapListEditItem>
                            <dx:BootstrapListEditItem Text="Out-Patient" Value="OUT"></dx:BootstrapListEditItem>
                        </Items>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="search" runat="server" ClientInstanceName="btn2" Width="100%" Text=" بحث " OnClick="search_Click">
                        <CssClasses Icon="simple-icon-magnifier" />
                        <SettingsBootstrap RenderOption="Success" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Prescription Items Grid Section

```html
<!-- Prescription Items Grid -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <div style="overflow:scroll;">
                <dx:BootstrapGridView ID="Orders" ShowHeaderWhenEmpty="True" runat="server" Width="100%" KeyFieldName="DoseID" OnSelectionChanged="Orders_SelectionChanged" SettingsBehavior-AllowSelectSingleRowOnly="true" AutoGenerateColumns="false" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true">
                    <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
                    <Settings ShowFilterRow="true" />
                    <Columns>
                        <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="true"></dx:BootstrapGridViewCommandColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="id" Visible="false"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="DoseID" Visible="false"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="Order No"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="Execution Date"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="Item Code"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="code" Visible="false"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="Item Name"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="Route"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="Dose"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="Dose Unit"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="frequency"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="Duration No"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="Duration Unit" Visible="false"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="Administration Instructions" Visible="false"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="IV_Header_Code_FK" Visible="false"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="Protocol_Header_Code_FK" Visible="false"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="Protocol Type"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="Order Type"></dx:BootstrapGridViewDataColumn>
                        <dx:BootstrapGridViewDataColumn FieldName="Current Total Doses"></dx:BootstrapGridViewDataColumn>
                    </Columns>
                </dx:BootstrapGridView>
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
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
        <dx:BootstrapLayoutItem ColSpanMd="4" Caption=":">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="float: left; color: white; background-color: white">
                        <dx:BootstrapButton runat="server" Text="  اضافة " ID="BTN_ADD" OnClick="BTN_ADD_Click">
                            <CssClasses Icon="simple-icon-plus" />
                            <SettingsBootstrap RenderOption="Info" />
                        </dx:BootstrapButton>
                        <dx:BootstrapButton runat="server" Text="  تعديل " ID="BTN_Edit_Temp" OnClick="BTN_Edit_Temp_Click">
                            <CssClasses Icon="simple-icon-note" />
                            <SettingsBootstrap RenderOption="Dark" />
                        </dx:BootstrapButton>
                        <dx:BootstrapButton runat="server" Text=" حذف الصنف " ID="BTN_Delete_Temp" OnClick="BTN_Delete_Temp_Click">
                            <CssClasses Icon="simple-icon-trash" />
                            <SettingsBootstrap RenderOption="Danger" />
                        </dx:BootstrapButton>
                        <dx:BootstrapButton runat="server" Text=" تحديث " ID="BTN_Refresh" OnClick="BTN_Refresh_Click">
                            <CssClasses Icon="simple-icon-refresh" />
                            <SettingsBootstrap RenderOption="Warning" />
                        </dx:BootstrapButton>
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Temporary Dispensing Grid Section

```html
<!-- Temporary Dispensing Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="tempItems" AutoPostBack="true" ClientInstanceName="tempItems" KeyFieldName="id" DataSourceID="TempItemsDS" OnSelectionChanged="tempItems_SelectionChanged" ShowHeaderWhenEmpty="True" runat="server" Width="100%" SettingsBehavior-AllowSelectSingleRowOnly="true" AutoGenerateColumns="False" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true">
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
                <Settings ShowFilterRow="true" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="true"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="id" Caption="Code" ReadOnly="True" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Item_Type_id" Caption="نوع الصنف" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
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

### Dispensing Save Section

```html
<!-- Dispensing Save -->
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

### Dispensing History Section

```html
<!-- Dispensing History -->
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
                    <dx:BootstrapGridViewDataColumn FieldName="FileId" Caption="رقم المريض"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Account" Visible="false" Caption="رقم الحساب"></dx:BootstrapGridViewDataColumn>
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

**Patient Parameters**:
- `@file` - Patient file ID for filtering prescriptions
- `@from` - Start date for prescription filtering
- `@to` - End date for prescription filtering

**Dispensing Parameters**:
- `@STORE` - Store ID for filtering items

**User Context Parameters**:
- `@emp` - Employee code for filtering stores and permissions
- `@user` - Username for filtering temporary dispensing records
- `@date` - Date for filtering temporary records
- `@effective` - Effective materials filter for item selection

**Item Parameters**:
- `@code` - Item code for batch selection
- `@store` - Store ID for batch selection

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Patient Selection**: Loads prescriptions based on selected patient
3. **Date Range Selection**: Filters prescriptions based on date range
4. **Department Selection**: Filters prescriptions based on department type
5. **Store Selection**: Loads items based on selected store
6. **Item Selection**: Loads batch information for selected item
7. **Dispensing**: Adds items to temporary dispensing grid
8. **Dispensing Save**: Creates complete dispensing records
9. **Dispensing History**: Loads previous dispensing for user

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
4. Sets default dispensing state

### Patient_SelectedIndexChanged Method

```csharp
protected void Patient_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads patient information based on selected patient

**Process**:
1. Validates patient selection
2. Retrieves patient details
3. Updates patient information display
4. Clears prescription selection

### search_Click Method

```csharp
protected void search_Click(object sender, EventArgs e)
```

**Purpose**: Loads prescriptions based on selected filters

**Process**:
1. Validates patient selection
2. Validates date range selection
3. Validates department selection
4. Sets parameters for prescription data source
5. Binds prescription grid
6. Clears item selection

### Orders_SelectionChanged Method

```csharp
protected void Orders_SelectionChanged(object sender, EventArgs e)
```

**Purpose**: Loads item information for selected prescription

**Process**:
1. Validates prescription selection
2. Retrieves prescription details from grid
3. Sets parameters for item data source
4. Binds item dropdown
5. Updates prescription information display

### Item_SelectedIndexChanged Method

```csharp
protected void Item_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads batch information for selected item

**Process**:
1. Validates item selection
2. Sets parameters for batch data source
3. Binds batch popup grid
4. Updates item information display

### BTN_ADD_Click Method

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
```

**Purpose**: Adds item to temporary dispensing grid

**Process**:
1. Validates all required fields are filled
2. Validates quantity is greater than 0
3. Validates need period is selected
4. Checks item availability
5. Inserts item into temporary table
6. Refreshes temporary dispensing grid
7. Clears form fields for next addition

### BTN_Edit_Temp_Click Method

```csharp
protected void BTN_Edit_Temp_Click(object sender, EventArgs e)
```

**Purpose**: Edits item in temporary dispensing grid

**Process**:
1. Validates item selection
2. Retrieves item details from temporary grid
3. Updates item information in temporary table
4. Refreshes temporary dispensing grid
5. Clears form fields

### BTN_Delete_Temp_Click Method

```csharp
protected void BTN_Delete_Temp_Click(object sender, EventArgs e)
```

**Purpose**: Deletes item from temporary dispensing grid

**Process**:
1. Validates item selection
2. Deletes item from temporary table
3. Refreshes temporary dispensing grid
4. Clears form fields

### BTN_Refresh_Click Method

```csharp
protected void BTN_Refresh_Click(object sender, EventArgs e)
```

**Purpose**: Refreshes temporary dispensing grid

**Process**:
1. Refreshes temporary dispensing grid
2. Updates grid display
3. Provides success feedback

### BTN_Save_Click Method

```csharp
protected void BTN_Save_Click(object sender, EventArgs e)
```

**Purpose**: Saves complete dispensing request

**Process**:
1. Validates at least one item is added
2. Generates new dispensing document number
3. Inserts dispensing header record
4. Inserts all temporary items as details
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

### Edit_Click Method

```csharp
protected void Edit_Click(object sender, EventArgs e)
```

**Purpose**: Edits existing dispensing request

**Process**:
1. Validates dispensing selection
2. Loads dispensing details from database
3. Updates dispensing header record
4. Updates all dispensing items as details
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

### BTN_Delete_Click Method

```csharp
protected void BTN_Delete_Click(object sender, EventArgs e)
```

**Purpose**: Deletes existing dispensing request

**Process**:
1. Validates dispensing selection
2. Shows delete confirmation popup
3. Deletes dispensing header record
4. Deletes all dispensing items
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

### Yes_Click Method

```csharp
protected void Yes_Click(object sender, EventArgs e)
```

**Purpose**: Confirms dispensing deletion

**Process**:
1. Validates dispensing selection
2. Deletes dispensing header record
3. Deletes all dispensing items
4. Clears temporary tables
5. Refreshes all grids and controls
6. Hides delete confirmation popup
7. Provides success feedback

### No_Click Method

```csharp
protected void No_Click(object sender, EventArgs e)
```

**Purpose**: Cancels dispensing deletion

**Process**:
1. Hides delete confirmation popup
2. Maintains current dispensing state
3. Allows user to continue editing

## Database Integration

### Core Database Tables

#### **Patient_information**
- **Purpose**: Patient master data
- **Key Fields**: FileId, Patient_Name
- **Usage**: Provides patient list for selection
- **Filtering**: Only patients with active visits

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, active, Store_type
- **Usage**: Provides store list for item filtering
- **Filtering**: Only stores with available items

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, active, Effective_Materails
- **Usage**: Provides item information for display
- **Filtering**: Only active items with available quantities

#### **Inventories_Dispense_Request_Details_Temp**
- **Purpose**: Temporary dispensing records before save
- **Key Fields**: id, Item_Type_id, item_code, Quntity, Due_Date, username, date, Type
- **Usage**: Tracks dispensing items before request save

#### **Inventories_Dispense_Request_Header**
- **Purpose**: Dispensing header records
- **Key Fields**: id, OrderNo, OrderType, Date, Time, Emp, Dep, store_id, FileId, Account, Active, closed, Status
- **Usage**: Tracks dispensing headers with approval workflow

#### **Inventories_Dispense_Request_Details**
- **Purpose**: Dispensing detail records
- **Key Fields**: id, header_fk, Item_Type_id, item_code, Quntity, Due_Date
- **Usage**: Tracks dispensing items after request save

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description
- **Usage**: Provides unit information for items

#### **Inventories_rules_stores**
- **Purpose**: Store rules master data
- **Key Fields**: store_id, emp_id, active
- **Usage**: Provides store rules for employees

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
**Validation**: Ensures user is authenticated before accessing dispensing operations

#### **Department Assignment**
```csharp
Dep.Value = cn.ExcuteSQL2("SELECT DepID,Dep_Name FROM DefinitionDep WHERE DepID in (SELECT top 1 EmpDepartment FROM DefinitionEmployee1 WHERE(EmpID = N'" + userinfo["code"].ToString() + "'))");
```

**Department Logic**: Auto-populates department based on user's employee record
**Validation**: Ensures user has valid department assignment
**Usage**: Provides context for dispensing operations

#### **Store Filtering**
```sql
SELECT WS.id as code, arabic_name
FROM Inventories_wharehouse_store WS 
inner join Inventories_rules_stores on store_id = WS.id
WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and emp_id =@emp1 and Store_type!=1
```

**Filtering Logic**: Shows only stores with available items for user
**Permission Logic**: Only stores with active rules are available
**Validation**: Ensures store has dispensing items

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
        <dx:BootstrapLayoutItem Caption="رقم الطلب" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="نوع الطلب" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="الإدارة" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="الموظف" ColSpanMd="3">
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="الملف الطبي" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="القسم" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Prescription Items Grid Section**
```html
<!-- Prescription Items Grid -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <div style="overflow:scroll;">
                <dx:BootstrapGridView ID="Orders" runat="server" OnSelectionChanged="Orders_SelectionChanged">
```

#### **3. Item Selection Section**
```html
<!-- Item Selection -->
<dx:BootstrapLayoutGroup ColSpanMd="12" ShowCaption="False">
    <Items>
        <dx:BootstrapLayoutItem ColSpanMd="12" Caption="المخزن">
        <dx:BootstrapLayoutItem ColSpanMd="12" Caption="الصنف">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الوحدة">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الكمية">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="مدة الاحتياج">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="كمية الصنف">
        <dx:BootstrapLayoutItem ColSpanMd="4" Caption=":">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **4. Temporary Dispensing Grid Section**
```html
<!-- Temporary Dispensing Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="tempItems" runat="server" OnSelectionChanged="tempItems_SelectionChanged">
```

#### **5. Dispensing Save Section**
```html
<!-- Dispensing Save -->
<dx:BootstrapLayoutItem ColSpanMd="12" ShowCaption="False">
    <ContentCollection>
        <dx:ContentControl>
            <div style="float: left">
                <dx:BootstrapButton ID="BTN_Save" runat="server" OnClick="BTN_Save_Click">
                <dx:BootstrapButton ID="Edit" runat="server" OnClick="Edit_Click">
                <dx:BootstrapButton ID="BTN_Delete" runat="server" OnClick="BTN_Delete_Click">
            </div>
```

#### **6. Dispensing History Section**
```html
<!-- Dispensing History -->
<dx:BootstrapLayoutItem ShowCaption="false" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="ItemsHisroy" runat="server" OnSelectionChanged="ItemsHisroy_SelectionChanged">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Patient Data Source
SqlDataSource PatientDS = new SqlDataSource();
PatientDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
PatientDS.SelectCommand = "select distinct Patient_information.FileId,Patient_information.Patient_Name from Patient_information";

// Store Data Source
SqlDataSource StoreDs = new SqlDataSource();
StoreDs.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
StoreDs.SelectCommand = "SELECT WS.id as code,arabic_name FROM Inventories_wharehouse_store WS inner join Inventories_rules_stores on store_id = WS.id WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and emp_id =@emp1 and Store_type!=1";

// Item Data Source
SqlDataSource ItemDS = new SqlDataSource();
ItemDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
ItemDS.SelectCommand = "SELECT arabic_name, item_code FROM Inventories_Item_Settings WHERE (active = 1) and Effective_Materails=@effective";

// Prescription Items Data Source (In-Patient)
SqlDataSource OrdersINDS = new SqlDataSource();
OrdersINDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
OrdersINDS.SelectCommand = "select Orders.OrderID as [Order No], Order_Pharmacy_Doses.Execution_Date as [Execution Date], code as [Item Code],code,EnglishName as [Item Name],Route, [Setup_Pharm_RelatedWith].Description,OrderEntery.Remain,OrderEntery.Dose_After as [Dose],dose_unit as [Dose Unit],frequency,Duration_No as [Duration No],OrderEntery.Duration_Unit as [Duration Unit],Administration_Instructions as [Administration Instructions],OrderEntery.Start_Date as [Start Date],OrderEntery.End_Date as [End Date],OrderEntery.id,OrderEntery.Protocol_Items_Type as [Protocol Type],OrderEntery.IV_Header_Code_FK,OrderEntery.Protocol_Header_Code_FK,Category as [Order Type],Empuser,case when OrderEntery.Doctor_Hold=1 then 'H' else 'R' end as [Status],OrderEntery.Doctor_Hold,cast(Order_Pharmacy_Doses.Execution_Date as time) [Start Time],Order_Pharmacy_Doses.Current_Total_Doses as [Current Total Doses],Order_Pharmacy_Doses.id as 'DoseID',Order_Pharmacy_Doses.IV_Header_Code_FK from OrderEntery,[Setup_Pharm_RelatedWith],Orders,Order_Pharmacy_Doses where [Setup_Pharm_RelatedWith].id=OrderEntery.Related_With and Orders.OrderID=OrderEntery.FK_OrderID and Order_Pharmacy_Doses.Order_Entry_FK=OrderEntery.ID and Orders.Department='Pharm' and OrderEntery.Statues= N'To be Verified' and Orders.FileId=@file and OrderEntery.Remain>0 and Statues_indicator='o' and DemandDate between @from and @to and Out_In_Patient='In' and orders.Patient_Type in('ICU','In-Patient') and Order_Pharmacy_Doses.Dispence_Done=0 and Orders.Account in (Select VisitAccount.AccountNo from VisitAccount where FileId=@file and VisitAccount.Active_Close='A') order by Execution_Date,code";

// Prescription Items Data Source (Day Care)
SqlDataSource OrdersDCDS = new SqlDataSource();
OrdersDCDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
OrdersDCDS.SelectCommand = "select Orders.OrderID as [Order No], Order_Pharmacy_Doses.Execution_Date as [Execution Date], code as [Item Code],code,EnglishName as [Item Name],Route, [Setup_Pharm_RelatedWith].Description,OrderEntery.Remain,OrderEntery.Dose_After as [Dose],dose_unit as [Dose Unit],frequency,Duration_No as [Duration No],OrderEntery.Duration_Unit as [Duration Unit],Administration_Instructions as [Administration Instructions],OrderEntery.Start_Date as [Start Date],OrderEntery.End_Date as [End Date],OrderEntery.id,OrderEntery.Protocol_Items_Type as [Protocol Type],OrderEntery.IV_Header_Code_FK,OrderEntery.Protocol_Header_Code_FK,Category as [Order Type],Empuser,case when OrderEntery.Doctor_Hold=1 then 'H' else 'R' end as [Status],OrderEntery.Doctor_Hold,cast(Order_Pharmacy_Doses.Execution_Date as time) [Start Time],Order_Pharmacy_Doses.Current_Total_Doses as [Current Total Doses],Order_Pharmacy_Doses.id as 'DoseID',Order_Pharmacy_Doses.IV_Header_Code_FK from OrderEntery,[Setup_Pharm_RelatedWith],Orders,Order_Pharmacy_Doses where [Setup_Pharm_RelatedWith].id=OrderEntery.Related_With and Orders.OrderID=OrderEntery.FK_OrderID and Order_Pharmacy_Doses.Order_Entry_FK=OrderEntery.ID and Orders.Department='Pharm' and OrderEntery.Statues= N'To be Verified' and Orders.FileId=@file and OrderEntery.Remain>0 and Statues_indicator='o' and DemandDate between @from and @to and Out_In_Patient='Out' and orders.Patient_Type='Day Care' and Order_Pharmacy_Doses.Dispence_Done=0 order by Execution_Date,code";

// Prescription Items Data Source (Out-Patient)
SqlDataSource OrdersOUTDS = new SqlDataSource();
OrdersOUTDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
OrdersOUTDS.SelectCommand = "select Orders.OrderID as [Order No], Order_Pharmacy_Doses.Execution_Date as [Execution Date], code as [Item Code],code,EnglishName as [Item Name],Route, [Setup_Pharm_RelatedWith].Description,OrderEntery.Remain,OrderEntery.Dose_After as [Dose],dose_unit as [Dose Unit],frequency,Duration_No as [Duration No],OrderEntery.Duration_Unit as [Duration Unit],Administration_Instructions as [Administration Instructions],OrderEntery.Start_Date as [Start Date],OrderEntery.End_Date as [End Date],OrderEntery.id,OrderEntery.Protocol_Items_Type as [Protocol Type],OrderEntery.IV_Header_Code_FK,OrderEntery.Protocol_Header_Code_FK,Category as [Order Type],Empuser,case when OrderEntery.Doctor_Hold=1 then 'H' else 'R' end as [Status],OrderEntery.Doctor_Hold,cast(Order_Pharmacy_Doses.Execution_Date as time) [Start Time],Order_Pharmacy_Doses.Current_Total_Doses as [Current Total Doses],Order_Pharmacy_Doses.id as 'DoseID',Order_Pharmacy_Doses.IV_Header_Code_FK from OrderEntery,[Setup_Pharm_RelatedWith],Orders,Order_Pharmacy_Doses where [Setup_Pharm_RelatedWith].id=OrderEntery.Related_With and Orders.OrderID=OrderEntery.FK_OrderID and Order_Pharmacy_Doses.Order_Entry_FK=OrderEntery.ID and Orders.Department='Pharm' and OrderEntery.Statues= N'To be Verified' and Orders.FileId=@file and OrderEntery.Remain>0 and Statues_indicator='o' and DemandDate between @from and @to and Out_In_Patient='Out' and orders.Patient_Type='Out-Patient' and Order_Pharmacy_Doses.Dispence_Done=0 order by Execution_Date,code";

// Temporary Dispensing Data Source
SqlDataSource TempItemsDS = new SqlDataSource();
TempItemsDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
TempItemsDS.SelectCommand = "SELECT Temp.id, IIS.arabic_name,ISett.arabic_name Discription,IIS.item_code, IIS.item_code, Quntity, Due_Date, username, date FROM Inventories_Dispense_Request_Details_Temp Temp left join Inventories_Item_Settings IIS on IIS.item_code = Temp.item_code left join Inventories_item_type ISett on ISett.id = Temp.Item_Type_id WHERE username = @user and date =@date and Type=8";

// Dispensing History Data Source
SqlDataSource ItemHis = new SqlDataSource();
ItemHis.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
ItemHis.SelectCommand = "SELECT id, OrderNo, OrderType, Date, Time, (select User_Name from Users where Emp_Code=convert(nvarchar,Emp)) Emp2,Emp, Dep,FileId,Account,(select arabic_name from Inventories_wharehouse_store where id=store_id) as arabic_name FROM Inventories_Dispense_Request_Header where Emp=@emp and Active = 1 and OrderType=8 and Status='a' and closed=0";
```

## Business Logic and Validation

### Patient and Date Validation

```csharp
protected void search_Click(object sender, EventArgs e)
{
    if (Patient.Value == "" || Patient.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المريض');", true);
        return;
    }
    else if (from.Text == "" || from.Text == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال التاريخ من');", true);
        return;
    }
    else if (to.Text == "" || to.Text == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال التاريخ الى');", true);
        return;
    }
    // ... additional validation
}
```

**Patient Logic**: Validates patient selection before loading prescriptions
**Date Logic**: Validates date range selection before loading prescriptions
**Error Prevention**: Prevents prescription loading without proper patient and date context

### Department Validation

```csharp
protected void search_Click(object sender, EventArgs e)
{
    if (OrderDep.Value == "" || OrderDep.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار القسم');", true);
        return;
    }
    // ... additional validation
}
```

**Department Logic**: Validates department selection before loading prescriptions
**Error Prevention**: Prevents prescription loading without proper department selection

### Store and Item Validation

```csharp
protected void Orders_SelectionChanged(object sender, EventArgs e)
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
**Item Logic**: Validates item selection before adding to dispensing
**Error Prevention**: Prevents item loading without proper store and item context

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
**Error Prevention**: Prevents dispensing with invalid quantity

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

**Need Period Logic**: Validates need period is selected before adding to dispensing
**Error Prevention**: Prevents dispensing without proper need period selection

### Dispensing Save Validation

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

**Dispensing Logic**: Validates at least one item is added before saving
**Empty Logic**: Prevents saving empty dispensing requests
**Error Prevention**: Ensures dispensing has proper content before processing

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Patient Selection Validation**: Must select patient before loading prescriptions
- **Date Range Validation**: Must select date range before loading prescriptions
- **Department Selection Validation**: Must select department before loading prescriptions
- **Store Selection Validation**: Must select store before loading items
- **Item Selection Validation**: Must select item from dropdown before dispensing
- **Quantity Validation**: Must enter positive quantity within limits
- **Need Period Validation**: Must select need period before adding to dispensing

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Patient Validation**: Ensures patient has active visit
- **Date Validation**: Ensures date range is valid and within limits
- **Department Validation**: Ensures department is valid type
- **Store Validation**: Ensures store has available items
- **Item Availability Validation**: Ensures items have available quantities
- **Quantity Validation**: Ensures quantities are within allowed limits
- **Need Period Validation**: Ensures need period is valid future date

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Store Access**: Ensures user has access to selected store
- **Dispensing Access**: Ensures user can access and modify dispensing requests

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
- **Dispensing Save Success**: "تم حفظ طلب الصرف" (Dispensing request saved successfully)
- **Dispensing Edit Success**: "تم تعديل طلب الصرف" (Dispensing request edited successfully)
- **Dispensing Delete Success**: "تم حذف طلب الصرف" (Dispensing request deleted successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of temporary dispensing grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Dispensing Management System**
- **Database Tables**:
  - `Inventories_Dispense_Request_Details_Temp` - Temporary dispensing records before save
  - `Inventories_Dispense_Request_Header` - Dispensing header records
  - `Inventories_Dispense_Request_Details` - Dispensing detail records
- **Integration Details**:
  - Dispensing workflow controlled by patient and prescription selection
  - Dispensing quantities tracked against available amounts
  - Temporary records stored before dispensing save
- **Data Flow**:
  - Items filtered by store and available quantities
  - Dispensing quantities validated against available limits
  - Temporary records stored for dispensing save

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
  - User authentication required for all dispensing operations
  - Department auto-population based on user profile

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
  - `Inventories_Stock` - Stock records
- **Integration Details**:
  - Item information displayed for dispensing selection
  - Store availability tracked with batch-level detail
  - Unit information calculated based on item associations
- **Data Flow**:
  - Item details loaded from item master data
  - Store information loaded from store master data
  - Unit information calculated from unit associations

### Data Exchange

#### **Patient and Prescription Information**
- **Database Tables**:
  - `Patient_information` - Patient master data
  - `OrderEntery` - Prescription order entries
  - `Order_Pharmacy_Doses` - Pharmacy dose records
- **Real-time Data**:
  - Patient information for prescription filtering
  - Prescription information for dispensing
  - Prescription items with quantities
- **Data Relationships**:
  - Patients linked to prescriptions via file ID
  - Prescriptions linked to items via order entries
  - Temporary records cleared after dispensing save

#### **Item and Batch Information**
- **Database Tables**:
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
  - `Inventories_Stock` - Stock records
- **Real-time Data**:
  - Item details and descriptions
  - Unit information and calculations
  - Batch information and quantities
- **Data Relationships**:
  - Items linked to types and units
  - Unit information calculated from unit associations
  - Batch information displayed for dispensing items

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار المريض" Error**
- **Cause**: Patient not selected before loading prescriptions
- **Solution**: Always select patient before loading prescriptions
- **Prevention**: Patient selection is required for all dispensing operations

#### **"الرجاء ادخال التاريخ من" Error**
- **Cause**: From date not selected before loading prescriptions
- **Solution**: Always select from date before loading prescriptions
- **Prevention**: Date range selection is required for all dispensing operations

#### **"الرجاء ادخال التاريخ الى" Error**
- **Cause**: To date not selected before loading prescriptions
- **Solution**: Always select to date before loading prescriptions
- **Prevention**: Date range selection is required for all dispensing operations

#### **"الرجاء اختيار القسم" Error**
- **Cause**: Department not selected before loading prescriptions
- **Solution**: Always select department before loading prescriptions
- **Prevention**: Department selection is required for all dispensing operations

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: Store not selected before loading items
- **Solution**: Always select store before loading items
- **Prevention**: Store selection is required for all dispensing operations

#### **"الرجاء ادخال الكمية" Error**
- **Cause**: Quantity not entered or zero/negative
- **Solution**: Always enter positive quantity
- **Prevention**: Quantity must be greater than 0

#### **"الكمية المدخلة اكبر من الكمية المتاحة" Error**
- **Cause**: Quantity exceeds available amount
- **Solution**: Enter quantity within available limit
- **Prevention**: System validates quantity against available amounts

#### **"الرجاء ادخال مدة الاحتياج" Error**
- **Cause**: Need period not selected before adding to dispensing
- **Solution**: Always select need period before adding to dispensing
- **Prevention**: Need period selection is required for all dispensing operations

#### **"لا يوجد اصناف مضافة" Error**
- **Cause**: No items added to dispensing before saving
- **Solution**: Add at least one item before saving
- **Prevention**: Dispensing must have items before saving

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Dispensing Access**: Access to dispensing operations
- **Store Access**: Access to stores with dispensing items
- **Prescription Access**: Access to prescriptions with approval workflow

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Dispensing Workflow**: Understanding of dispensing process
- **Store Management**: Knowledge of store selection and item filtering
- **Prescription Management**: Familiarity with prescription selection and item loading
- **Dispensing Management**: Understanding of dispensing save, edit, and delete operations

## Usage Examples

### Basic Dispensing Workflow

1. **Page Load**: Verify department and employee are auto-selected
2. **Patient Selection**: Select patient for medication dispensing
3. **Date Range Selection**: Select date range for prescription filtering
4. **Department Selection**: Select department type (Day Care, In-Patient, Out-Patient)
5. **Search Execution**: Click search button to load prescriptions
6. **Prescription Selection**: Select prescription from prescription items grid
7. **Store Selection**: Select store for dispensing
8. **Item Selection**: Select item from available medications dropdown
9. **Quantity Entry**: Enter dispensing quantity within limits
10. **Need Period Selection**: Select need period date
11. **Item Addition**: Click add button to add item to temporary dispensing grid
12. **Repeat Items**: Add additional dispensing items as needed
13. **Dispensing Save**: Click save button to create complete dispensing request

### Dispensing Item Management Workflow

1. **Patient Selection**: Select patient for medication dispensing
2. **Date Range Selection**: Select date range for prescription filtering
3. **Department Selection**: Select department type
4. **Search Execution**: Click search button to load prescriptions
5. **Prescription Selection**: Select prescription from prescription items grid
6. **Store Selection**: Select store for dispensing
7. **Item Selection**: Select item from available medications dropdown
8. **Quantity Entry**: Enter dispensing quantity within limits
9. **Need Period Selection**: Select need period date
10. **Item Addition**: Add item to temporary dispensing grid
11. **Item Review**: Review items in temporary dispensing grid
12. **Item Edit**: Edit items in temporary dispensing grid
13. **Item Delete**: Remove items from temporary dispensing grid
14. **Dispensing Completion**: Save dispensing with all validated items

### Multi-Prescription Dispensing Management

1. **Patient Selection**: Select patient for medication dispensing
2. **Date Range Selection**: Select date range for prescription filtering
3. **Department Selection**: Select department type
4. **Search Execution**: Click search button to load prescriptions
5. **Prescription Review**: Review all prescriptions in prescription items grid
6. **Selective Dispensing**: Add specific items from different prescriptions as needed
7. **Quantity Management**: Manage dispensing quantities for each item
8. **Store Management**: Manage stores for each item
9. **Dispensing Validation**: Ensure all items have proper validation
10. **Dispensing Save**: Save dispensing with all validated items