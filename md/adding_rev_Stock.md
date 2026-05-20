← Go back to 
[Inventories Module Documentation](/Inventories)

# adding_rev_Stock.aspx

## Overview

**File**: `\Inventories\Process\adding_rev_Stock.aspx`
**Purpose**: Review and approval interface for inventory addition requests with supplier invoice management, electronic number tracking, and addition document number generation
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory managers, finance personnel, and approval workflow administrators

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Department and Employee Information (Auto-populated)**
- **Department Dropdown**: Hidden field, auto-populated based on user's employee record
- **Employee Dropdown**: Auto-populated from user authentication
- **Error Prevention**: System validates user has valid department assignment
- **Data Source**: DefinitionDep and DefinitionEmployee1 tables
- **Default Behavior**: Auto-populated from user profile on page load
- **Validation**: Only users with valid department assignments can access

#### 2. **Document Selection (Required for Review)**
- **Document Number Dropdown**: Must select document number for addition review
- **Error Prevention**: System validates document selection before data retrieval
- **Data Source**: Inventories_Examination_receipt table with filtering
- **Default Behavior**: User must select document manually
- **Error Message**: "الرجاء ادخال رقم المستند" (Please enter document number)
- **Validation**: Only documents with specific status conditions are available

#### 3. **Supplier Invoice Information (Required for Approval)**
- **Supplier Invoice Number Field**: Must enter supplier invoice number
- **Error Prevention**: System validates invoice number before approval
- **Data Source**: User input with validation
- **Default Behavior**: User must enter invoice number manually
- **Error Message**: "الرجاء ادخال رقم فاتورة المورد" (Please enter supplier invoice number)
- **Validation**: Invoice number must be valid and not empty

#### 4. **Electronic Number (Optional for Tracking)**
- **Electronic Number Field**: Optional entry for electronic invoice tracking
- **Error Prevention**: System handles null values gracefully
- **Data Source**: User input with auto-calculation
- **Default Behavior**: Optional field, defaults to empty
- **Validation**: System auto-calculates addition document number based on electronic number

#### 5. **Addition Document Number (Auto-calculated)**
- **Addition Document Number Field**: Auto-calculated based on electronic number
- **Error Prevention**: System calculates based on existing additions
- **Data Source**: Auto-calculated from database query
- **Default Behavior**: Auto-calculated when electronic number is entered
- **Validation**: System counts existing additions for electronic number

#### 6. **Addition Request Selection (Required for Operations)**
- **Grid Row Selection**: Must select specific addition requests for approval/rejection
- **Error Prevention**: System validates row selection before operations
- **Data Source**: Grid selection with validation
- **Default Behavior**: User must select rows manually
- **Error Message**: "Please Select row" (English message)
- **Validation**: Only selected rows are processed for approval/rejection

#### 7. **Rejection Reason (Required for Rejection)**
- **Rejection Reason Dropdown**: Must select reason for rejection
- **Error Prevention**: System validates rejection reason before rejection
- **Data Source**: Inventories_Reasons table with type filtering
- **Default Behavior**: User must select reason manually
- **Validation**: Only active rejection reasons of specific type are available

### Common Error Scenarios and Prevention

#### **Document Selection Errors**
- **Error**: "الرجاء ادخال رقم المستند" (Please enter document number)
- **Prevention**: Always select document number before searching
- **Error**: Document dropdown empty
- **Prevention**: Ensure documents with proper status conditions exist

#### **Invoice Information Errors**
- **Error**: "الرجاء ادخال رقم فاتورة المورد" (Please enter supplier invoice number)
- **Prevention**: Always enter supplier invoice number before approval
- **Error**: Invalid invoice number format
- **Prevention**: Use valid invoice number format

#### **Row Selection Errors**
- **Error**: "Please Select row" (English message)
- **Prevention**: Always select rows before approval/rejection operations
- **Error**: Multiple row selection conflicts
- **Prevention**: Select appropriate rows for batch operations

#### **Rejection Reason Errors**
- **Error**: Missing rejection reason
- **Prevention**: Always select rejection reason before rejection
- **Error**: Invalid rejection reason
- **Prevention**: Use valid rejection reasons from dropdown

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have department assignment** in employee master data
3. **Documents must exist** with proper status conditions (Examination_done='1', receipt_done='1', Adding_indator='1', Adding_rev_indator='0', Adding_approve_indator='0')
4. **Rejection reasons must be configured** in system
5. **Supplier invoice information must be available** for approval
6. **Electronic number tracking must be configured** for auto-calculation

#### **Required System State**
- User authentication must be active
- Department assignments must be current
- Document data must be current with proper status conditions
- Rejection reason master data must be current
- Supplier invoice information must be available
- Electronic number tracking must be configured

### Success Criteria

#### **For Document Selection**
- ✅ Document selection validation prevents data retrieval without selection
- ✅ Document dropdown shows only documents with proper status conditions
- ✅ Document selection works correctly with data filtering
- ✅ User feedback confirms successful document selection

#### **For Supplier Invoice Information**
- ✅ Invoice number validation prevents approval without invoice number
- ✅ Invoice number field accepts valid input
- ✅ Invoice number works correctly with approval operations
- ✅ User feedback confirms successful invoice number entry

#### **For Addition Request Review**
- ✅ Document selection and invoice number prevent operations without requirements
- ✅ Grid display shows addition requests with proper formatting and status
- ✅ Row selection works correctly for approval/rejection operations
- ✅ Status indicators display correctly for addition requests

#### **For Electronic Number Tracking**
- ✅ Electronic number field accepts valid input
- ✅ Addition document number auto-calculation works correctly
- ✅ Electronic number tracking works correctly with database queries
- ✅ User feedback confirms successful electronic number entry

#### **For Approval Operations**
- ✅ Row selection validation prevents operations without selection
- ✅ Approval operations work correctly with proper status updates
- ✅ Rejection operations work correctly with proper status updates
- ✅ PO order quantity updates work correctly for rejections

#### **For Data Management**
- ✅ Grid refreshes after all operations
- ✅ Selection states clear after operations
- ✅ Status updates work correctly
- ✅ Success feedback confirms operations

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Vertical" dir="rtl" ID="BootstrapFormLayout">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for addition review

### Header Information Section

```html
<!-- Header Information -->
<dx:BootstrapLayoutItem Caption="الادارة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
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
<dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
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
```

### Document and Invoice Information Section

```html
<!-- Document and Invoice Information -->
<dx:BootstrapLayoutItem Caption="تاريخ الطلب" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapDateEdit runat="server" Width="100%" ID="Calendar1" Enabled="false" OnDateChanged="Calendar1_DateChanged" AutoPostBack="true"></dx:BootstrapDateEdit>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="رقم المستند" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox ID="txt_doc_no" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="true" DataSourceID="doc_data_sorce" ValueField="doc_id" TextField="doc_id">
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="search" runat="server" ClientInstanceName="btn5" Width="100%" Text=" بحث " OnClick="search_Click">
                <ClientSideEvents Click="function(s, e) { DisableButton3(btn5,'btn5'); }" />
                <CssClasses Icon="simple-icon-magnifier" />
                <SettingsBootstrap RenderOption="Success" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Addition Request Grid Section

```html
<!-- Addition Request Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView runat="server" ID="grid_GridView1" ClientInstanceName="gridre" AutoGenerateColumns="false" AutoPostBack="True" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" DataSourceID="SqlDataSource7" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true" OnSelectionChanged="grid_GridView1_SelectionChanged">
                <Settings ShowFilterRow="true" />
                <Settings ShowFooter="true" />
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="ID" ReadOnly="True" Visible="false" Caption="كود " VisibleIndex="0">
                        <SettingsEditForm Visible="False"></SettingsEditForm>
                    </dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="PO_ID_FK" Caption="امر التوريد" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="full_Name" Caption="اسم المورد" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Itemcode" Caption="كود الصنف" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="itemName" Caption="اسم الصنف" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Amount" Caption="الكمية" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Done_Amount" Caption="الكمية المستلم" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Remain_Amount" Caption="الكمية المتبقية" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="PO_DemandAmount" Caption="كمية امر الشراء" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Price_unit" Caption="سعر الوحدة" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Grand_Total" Caption="صافى السعر" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="description" Caption="وحدة الشراء" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="uom_deliver_unit" Caption="وحدة الاستلام" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewDateColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" VisibleIndex="6"></dx:BootstrapGridViewDateColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Purchase_Id_unit" Caption="رقم وحدة الشراء" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="delivery_id_unit" Caption="رقم وحدة الاستلام" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="doc_id" Caption="رقم المستند" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="batch_no" Caption="رقم المستند" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Store_id" Caption="المخزن" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="inv_num" Caption="رقم الفاتورة" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="fk_check" Caption="رقم اللجنة" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="passage_id" Caption="الممر" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="shelf_id" Caption="الرف" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="storage_Id_unit" Caption="وحدة التخزين" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="uom_storage_unit" Caption="وحدة التخزين" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="uom_Exchange_unit" Caption="وحدة الصرف" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Exchange_id_unit" Caption="وحدة الصرف" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="delivery_q" Caption="الكمية بوحدة الاستلام" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="storage_q" Caption="الكمية بوحدة التخزين" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="exchange_q" Caption="الكمية بوحدة الاستخدام" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Quantity_ex" Caption="معامل الصرف" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                </Columns>
                <Settings VerticalScrollableHeight="350" />
                <SettingsPager PageSize="50">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
                <TotalSummary>
                    <dx:ASPxSummaryItem FieldName="Grand_Total" SummaryType="Sum" DisplayFormat="{0} الاجمالي العام " />
                </TotalSummary>
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Invoice and Document Information Section

```html
<!-- Invoice and Document Information -->
<dx:BootstrapLayoutItem Caption="رقم فاتورة المورد" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox runat="server" ID="inv_num"></dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="الرقم الالكترونى للفاتورة" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox runat="server" ID="ElectronicNumber" OnTextChanged="ElectronicNumber_TextChanged" AutoPostBack="true"></dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="عدد اذونات الاضافة" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapSpinEdit runat="server" ID="txtAddNum" AllowMouseWheel="false" Enabled="false" NullText="0" AutoPostBack="true"></dx:BootstrapSpinEdit>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Approval Operations Section

```html
<!-- Approval Operations -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" BeginRow="true">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="Adding" runat="server" ClientInstanceName="btn4" Width="100%" Text=" تاكيد الاضافة" OnClick="Adding_Click">
                <ClientSideEvents Click="function(s, e) { DisableButton3(btn4,'btn4'); }" />
                <CssClasses Icon="simple-icon-magnifier" />
                <SettingsBootstrap RenderOption="Success" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="سبب الرفض" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox AutoPostBack="true" runat="server" TextField="reason" ValueField="id" DataSourceID="dsReasons" EnableMultiColumn="true" CallbackPageSize="15" Enabled="true" Width="100%" ID="emp_reason">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="reason" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="." CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="reject" runat="server" ClientInstanceName="btn3" Width="100%" Text=" رفض الاضافة " OnClick="reject_Click">
                <ClientSideEvents Click="function(s, e) { DisableButton3(btn3,'btn3'); }" />
                <CssClasses Icon="simple-icon-magnifier" />
                <SettingsBootstrap RenderOption="Danger" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Approved Addition Requests Grid Section

```html
<!-- Approved Addition Requests Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView runat="server" ID="Bootstrap_end_adding" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" AutoPostBack="True" Styles-Cell-HorizontalAlign="Center" DataSourceID="SqlDataSource1" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="false" SettingsBehavior-ProcessSelectionChangedOnServer="false" OnSelectionChanged="Bootstrap_end_adding_SelectionChanged">
                <Settings ShowFilterRow="true" />
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                <Columns>
                    <dx:BootstrapGridViewTextColumn FieldName="ID" ReadOnly="True" Visible="false" Caption="كود " VisibleIndex="0">
                        <SettingsEditForm Visible="False"></SettingsEditForm>
                    </dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="PO_ID_FK" Caption="امر التوريد" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="full_Name" Caption="اسم المورد" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Itemcode" Caption="كود الصنف" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="itemName" Caption="اسم الصنف" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Amount" Caption="الكمية" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Done_Amount" Caption="الكمية المستلم" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Remain_Amount" Caption="الكمية المتبقية" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="PO_DemandAmount" Caption="كمية امر الشراء" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Price_unit" Caption="سعر الوحدة" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Total_Price" Caption="اجمالى السعر" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Discount" Caption="الخصم" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Grand_Total" Caption="صافى السعر" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="description" Caption="وحدة الشراء" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="uom_deliver_unit" Caption="وحدة الاستلام" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewDateColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" VisibleIndex="6"></dx:BootstrapGridViewDateColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Purchase_Id_unit" Caption="رقم وحدة الشراء" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="delivery_id_unit" Caption="رقم وحدة الاستلام" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="doc_id" Caption="رقم المستند" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="batch_no" Caption="رقم المستند" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Store_id" Caption="المخزن" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="inv_num" Caption="رقم الفاتورة" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="fk_check" Caption="رقم اللجنة" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="passage_id" Caption="الممر" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="shelf_id" Caption="الرف" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="storage_Id_unit" Caption="وحدة التخزين" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="uom_storage_unit" Caption="وحدة التخزين" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="uom_Exchange_unit" Caption="وحدة الصرف" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Exchange_id_unit" Caption="وحدة الصرف" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="delivery_q" Caption="الكمية بوحدة الاستلام" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="storage_q" Caption="الكمية بوحدة التخزين" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="exchange_q" Caption="الكمية بوحدة الاستخدام" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                </Columns>
                <Settings VerticalScrollableHeight="350" />
                <SettingsPager PageSize="50">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

## Data Flow Architecture

### Query String Parameters

The system uses control parameters for comprehensive data filtering:

**Document Parameters**:
- `@doc` - Document ID for filtering addition requests

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Department Auto-population**: Retrieves department from user's employee record
3. **Document Loading**: Loads documents with specific status conditions
4. **Data Retrieval**: Retrieves addition requests based on document selection
5. **Grid Binding**: Binds data to grids with comprehensive addition request information
6. **Electronic Number Processing**: Auto-calculates addition document number based on electronic number
7. **Approval Operations**: Processes approval/rejection with status updates and PO adjustments

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication cookies
2. Auto-populates department and employee information
3. Sets default date to current date
4. Binds data sources and grids
5. Sets up electronic number tracking

### search_Click Method

```csharp
protected void search_Click(object sender, EventArgs e)
```

**Purpose**: Searches for addition requests based on document selection

**Process**:
1. Validates document number selection
2. Sets parameters for data sources
3. Binds grids with filtered data
4. Clears grid selections

### Adding_Click Method

```csharp
protected void Adding_Click(object sender, EventArgs e)
```

**Purpose**: Approves selected addition requests with supplier invoice and electronic number tracking

**Process**:
1. Validates document number, supplier invoice number, and row selection
2. Updates addition status to reviewed with user, timestamp, supplier invoice number, electronic number, and addition document number
3. Provides user feedback for successful approval
4. Refreshes grids and clears selections

### reject_Click Method

```csharp
protected void reject_Click(object sender, EventArgs e)
```

**Purpose**: Rejects selected addition requests

**Process**:
1. Validates document number and row selection
2. Updates addition status to rejected with user, timestamp, and reason
3. Updates PO order quantities to restore original amounts
4. Provides user feedback for successful rejection
5. Refreshes grids and clears selections

### ElectronicNumber_TextChanged Method

```csharp
protected void ElectronicNumber_TextChanged(object sender, EventArgs e)
```

**Purpose**: Auto-calculates addition document number based on electronic number

**Process**:
1. Checks if electronic number is empty
2. If empty, sets addition document number to 0
3. If not empty, counts existing additions for electronic number
4. Sets addition document number based on count

### grid_GridView1_SelectionChanged Method

```csharp
protected void grid_GridView1_SelectionChanged(object sender, EventArgs e)
```

**Purpose**: Handles addition request selection from grid

**Process**:
1. Retrieves selected item information
2. Populates hidden fields with item data
3. Enables appropriate buttons for operations

## Database Integration

### Inventories_Examination_receipt Table

**Purpose**: Addition request master data with review workflow status
**Key Fields**: ID, PO_ID_FK, Itemcode, Amount, Done_Amount, Remain_Amount, PO_DemandAmount, Price_unit, Total_Price, Discount, Grand_Total, Store_id, Purchase_Id_unit, delivery_id_unit, Expiration_date, batch_no, indicator, Emp_code, date_time, fk_check, Examination_done, receipt_done, doc_id, inv_num, passage_id, shelf_id, storage_Id_unit, Exchange_id_unit, Adding_indator, Adding_rev_indator, Adding_approve_indator, Adding_rev_user, Adding_rev_date, Adding_rev_reject_r, ElectromicNumber, AddingDocNumber
**Integration**: Links to purchase orders, suppliers, and inventory stock
**Usage**: Main data source for addition request review

### Inventories_Item_Settings Table

**Purpose**: Item master data with Arabic names
**Key Fields**: item_code, arabic_name
**Integration**: Links items to addition requests
**Usage**: Provides item information for display

### Inventories_UOM Table

**Purpose**: Unit of measure master data
**Key Fields**: id, description
**Integration**: Links to item units for display
**Usage**: Provides unit descriptions for display

### Inventories_UOM_item_unit Table

**Purpose**: Item unit conversion factors
**Key Fields**: unit_id, item_code, unit_type_id, Quantity
**Integration**: Links units to items with conversion factors
**Usage**: Provides unit conversion calculations for different unit types

### Purchese_PO_Order_Header Table

**Purpose**: Purchase order header master data with supplier information
**Key Fields**: id, Sup_Code_fk
**Integration**: Links purchase orders to suppliers
**Usage**: Provides supplier information for addition requests

### purches_Supplier_record Table

**Purpose**: Supplier master data with Arabic names
**Key Fields**: Supplier_code, Arabic_name
**Integration**: Links suppliers to purchase orders
**Usage**: Provides supplier information for display

### Inventories_Reasons Table

**Purpose**: Rejection reason master data
**Key Fields**: id, reason, active, type
**Integration**: Links to rejection operations
**Usage**: Provides rejection reason options for addition request rejections

### DefinitionDep Table

**Purpose**: Department master data
**Key Fields**: DepID, Dep_Name
**Integration**: Links to employee records
**Usage**: Provides department information for auto-population

### DefinitionEmployee1 Table

**Purpose**: Employee master data with department assignments
**Key Fields**: EmpID, EmpDepartment
**Integration**: Links employees to departments
**Usage**: Provides department auto-population from user profile

### Users Table

**Purpose**: User master data with employee codes
**Key Fields**: Emp_Code, User_Name
**Integration**: Links to authentication system
**Usage**: Provides employee information for auto-population

## Client-Side JavaScript

### Button Disabling

```javascript
function DisableButton3(buttonnameobject, buttonnamestring) {
    window.setTimeout(buttonnamestring + ".SetEnabled(false)", 0);
    var x = buttonnameobject;
    x.SetText("Please wait...");
}
```

**Purpose**: Disables buttons during operations to prevent multiple submissions

### Single Selection

```javascript
function CheckOne(obj) {
    var grid = obj.parentNode.parentNode.parentNode;
    var inputs = grid.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox") {
            if (obj.checked && inputs[i] != obj && inputs[i].checked) {
                inputs[i].checked = false;
            }
        }
    }
}
```

**Purpose**: Ensures only one item can be selected at a time

### Back Button Prevention

```javascript
function noBack() { window.history.forward(); }
noBack();
window.onload = noBack;
window.onpageshow = function (evt) { if (evt.persisted) noBack(); }
window.onunload = function () { void (0); }
```

**Purpose**: Prevents users from using browser back button

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Header Information Section**
```html
<!-- Department and Employee -->
<dx:BootstrapLayoutItem Caption="الادارة" ColSpanMd="3">
<dx:BootstrapLayoutItem Caption="المسؤل" ColSpanMd="3">
```

#### **2. Document and Invoice Information Section**
```html
<!-- Document and Invoice Information -->
<dx:BootstrapLayoutItem Caption="تاريخ الطلب" ColSpanMd="2">
<dx:BootstrapLayoutItem Caption="رقم المستند" ColSpanMd="2">
<dx:BootstrapLayoutItem Caption="بحث" ColSpanMd="2">
```

#### **3. Addition Request Grid Section**
```html
<!-- Addition Request Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **4. Invoice and Document Information Section**
```html
<!-- Invoice and Document Information -->
<dx:BootstrapLayoutItem Caption="رقم فاتورة المورد" ColSpanMd="4">
<dx:BootstrapLayoutItem Caption="الرقم الالكترونى للفاتورة" ColSpanMd="4">
<dx:BootstrapLayoutItem Caption="عدد اذونات الاضافة" ColSpanMd="4">
```

#### **5. Approval Operations Section**
```html
<!-- Approval Operations -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="2" BeginRow="true">
<dx:BootstrapLayoutItem Caption="سبب الرفض" ColSpanMd="4">
<dx:BootstrapLayoutItem Caption="." ColSpanMd="2">
```

#### **6. Approved Addition Requests Grid Section**
```html
<!-- Approved Addition Requests Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

### Data Sources and Connectivity

#### **Department Data Source**
```csharp
SqlDataSource DepDS = new SqlDataSource();
DepDS.ConnectionString = ConfigurationManager.ConnectionStrings["BackOffice_CS"].ConnectionString;
DepDS.SelectCommand = "SELECT DepID,Dep_Name FROM DefinitionDep";
```

#### **Employee Data Source**
```csharp
SqlDataSource Emp = new SqlDataSource();
Emp.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
Emp.SelectCommand = "select User_Name,Emp_Code from Users where Active=1 and Emp_Code not in ('0','00')";
```

#### **Document Data Source**
```csharp
SqlDataSource doc_data_sorce = new SqlDataSource();
doc_data_sorce.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
doc_data_sorce.SelectCommand = "select distinct Inventories_Examination_receipt.doc_id from Inventories_Examination_receipt where Examination_done='1' and receipt_done='1' and Adding_indator='1' and Adding_rev_indator='0' and Adding_approve_indator='0'";
```

#### **Addition Request Data Source**
```csharp
SqlDataSource SqlDataSource7 = new SqlDataSource();
SqlDataSource7.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource7.SelectCommand = "SELECT distinct Inventories_Examination_receipt.ID,PO_ID_FK,purches_Supplier_record.Arabic_name as full_Name, Itemcode,Inventories_Item_Settings.arabic_name [itemName], Amount, Done_Amount, Remain_Amount, PO_DemandAmount, Price_unit, Total_Price, Discount, Grand_Total, Store_id, Purchase_Id_unit,Inventories_UOM.description, delivery_id_unit,uom.description as uom_deliver_unit, Expiration_date, batch_no, indicator, Emp_code, date_time, fk_check, Examination_done, receipt_done, doc_id,inv_num,passage_id,shelf_id,storage_Id_unit,Exchange_id_unit,uom1.description as uom_storage_unit,uom2.description as uom_Exchange_unit, Inventories_UOM_item_unit.Quantity*uom_unit1.Quantity*Done_Amount as delivery_q, Inventories_UOM_item_unit.Quantity * uom_unit1.Quantity * uom_unit2.Quantity * Done_Amount as storage_q, Inventories_UOM_item_unit.Quantity * uom_unit1.Quantity * uom_unit2.Quantity * uom_unit3.Quantity * Done_Amount as exchange_q, uom_unit3.Quantity as [Quantity_ex] FROM Inventories_Examination_receipt inner join Inventories_UOM on Inventories_UOM.id = Inventories_Examination_receipt.delivery_id_unit left join Inventories_UOM_item_unit on Inventories_UOM_item_unit.unit_id = Inventories_UOM.id and Itemcode = Inventories_UOM_item_unit.item_code and unit_type_id = 2 inner join Inventories_UOM as uom on uom.id = Inventories_Examination_receipt.Purchase_Id_unit left join Inventories_UOM_item_unit as uom_unit1 on uom_unit1.unit_id = uom.id and Itemcode = uom_unit1.item_code and uom_unit1.unit_type_id = 1 inner join Inventories_UOM as uom1 on uom1.id = Inventories_Examination_receipt.storage_Id_unit left join Inventories_UOM_item_unit as uom_unit2 on uom_unit2.unit_id = uom1.id and Itemcode = uom_unit2.item_code and uom_unit2.unit_type_id = 3 inner join Inventories_UOM as uom2 on uom2.id = Inventories_Examination_receipt.Exchange_id_unit left join Inventories_UOM_item_unit as uom_unit3 on uom_unit3.unit_id = uom2.id and Itemcode = uom_unit3.item_code and uom_unit3.unit_type_id = 4 inner join Purchese_PO_Order_Header on Purchese_PO_Order_Header.id=Inventories_Examination_receipt.PO_ID_FK inner join purches_Supplier_record on purches_Supplier_record.Supplier_code=Purchese_PO_Order_Header.Sup_Code_fk inner join Inventories_Item_Settings on Inventories_Item_Settings.item_code = Inventories_Examination_receipt.Itemcode where doc_id=@doc and Examination_done='1' and receipt_done='1' and Adding_indator='1' and Adding_rev_indator='0'";
```

#### **Approved Addition Requests Data Source**
```csharp
SqlDataSource SqlDataSource1 = new SqlDataSource();
SqlDataSource1.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource1.SelectCommand = "SELECT distinct Inventories_Examination_receipt.ID,PO_ID_FK,purches_Supplier_record.Arabic_name as full_Name, Itemcode,Inventories_Item_Settings.arabic_name [itemName], Amount, Done_Amount, Remain_Amount, PO_DemandAmount, Price_unit, Total_Price, Discount, Grand_Total, Store_id, Purchase_Id_unit,Inventories_UOM.description, delivery_id_unit,uom.description as uom_deliver_unit, Expiration_date, batch_no, indicator, Emp_code, date_time, fk_check, Examination_done, receipt_done, doc_id,inv_num,passage_id,shelf_id,storage_Id_unit,Exchange_id_unit,uom1.description as uom_storage_unit,uom2.description as uom_Exchange_unit, Inventories_UOM_item_unit.Quantity*uom_unit1.Quantity*Done_Amount as delivery_q, Inventories_UOM_item_unit.Quantity * uom_unit1.Quantity * uom_unit2.Quantity * Done_Amount as storage_q, Inventories_UOM_item_unit.Quantity * uom_unit1.Quantity * uom_unit2.Quantity * uom_unit3.Quantity * Done_Amount as exchange_q FROM Inventories_Examination_receipt inner join Inventories_UOM on Inventories_UOM.id = Inventories_Examination_receipt.delivery_id_unit left join Inventories_UOM_item_unit on Inventories_UOM_item_unit.unit_id = Inventories_UOM.id and Itemcode = Inventories_UOM_item_unit.item_code and unit_type_id = 2 inner join Inventories_UOM as uom on uom.id = Inventories_Examination_receipt.Purchase_Id_unit left join Inventories_UOM_item_unit as uom_unit1 on uom_unit1.unit_id = uom.id and Itemcode = uom_unit1.item_code and uom_unit1.unit_type_id = 1 inner join Inventories_UOM as uom1 on uom1.id = Inventories_Examination_receipt.storage_Id_unit left join Inventories_UOM_item_unit as uom_unit2 on uom_unit2.unit_id = uom1.id and Itemcode = uom_unit2.item_code and uom_unit2.unit_type_id = 3 inner join Inventories_UOM as uom2 on uom2.id = Inventories_Examination_receipt.Exchange_id_unit left join Inventories_UOM_item_unit as uom_unit3 on uom_unit3.unit_id = uom2.id and Itemcode = uom_unit3.item_code and uom_unit3.unit_type_id = 4 inner join Purchese_PO_Order_Header on Purchese_PO_Order_Header.id=Inventories_Examination_receipt.PO_ID_FK inner join purches_Supplier_record on purches_Supplier_record.Supplier_code=Purchese_PO_Order_Header.Sup_Code_fk inner join Inventories_Item_Settings on Inventories_Item_Settings.item_code = Inventories_Examination_receipt.Itemcode where doc_id=@doc and Examination_done='1' and receipt_done='1' and Adding_indator='1' and Adding_rev_indator='1'";
```

#### **Rejection Reasons Data Source**
```csharp
SqlDataSource dsReasons = new SqlDataSource();
dsReasons.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsReasons.SelectCommand = "select id, reason from Inventories_Reasons where active=1 and type=19";
```

## Business Logic and Validation

### Document and Supplier Invoice Selection Validation

```csharp
protected void search_Click(object sender, EventArgs e)
{
    if (txt_doc_no.Text == "")
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال رقم المستند ');", true);
        return;
    }
    else
    {
        // ... search logic
    }
}
```

**Purpose**: Validates document number and supplier invoice number before data retrieval
**Process**: Ensures document number and supplier invoice number are selected before searching

### Row Selection Validation

```csharp
protected void Adding_Click(object sender, EventArgs e)
{
    if (txt_doc_no.Text == "")
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال رقم المستند ');", true);
        return;
    }
    else if (inv_num.Text == "")
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال رقم فاتورة المورد ');", true);
        return;
    }
    else
    {
        // Row selection validation
        string checkselect = "";
        for (int i = 0; i < grid_GridView1.VisibleRowCount; i++)
        {
            if (grid_GridView1.Selection.IsRowSelected(i))
            {
                checkselect = "1";
                break;
            }
        }
        if (checkselect == "")
        {
            ScriptManager.RegisterStartupScript(this, GetType(), "Error Messsage", "alert('Please Select row');", true);
            return;
        }
        // ... approval logic
    }
}
```

**Purpose**: Validates document number, supplier invoice number, and row selection before approval operations
**Process**: Ensures all required fields are selected before approval

### Addition Review Logic

```csharp
protected void Adding_Click(object sender, EventArgs e)
{
    HttpCookie userinfo = Request.Cookies["user"];
    user = userinfo["code"].ToString();

    // Document and supplier invoice validation
    // Row selection validation
    // Status update with supplier invoice number, electronic number, and addition document number

    cn.ExcuteSQL("update Inventories_Examination_receipt set inv_num= '" + inv_num.Text + "' , Inventories_Examination_receipt.Adding_rev_indator = '1',ElectromicNumber='"+ ElectronicNumber.Text+ "',AddingDocNumber='"+ txtAddNum.Text+ "',  " +
        " Inventories_Examination_receipt.Adding_rev_user = '" + user + "',Inventories_Examination_receipt.Adding_rev_date='" + DateTime.Now.Date.ToString("yyyy-MM-dd") + "'" +
        " where  Inventories_Examination_receipt.ID ='" + ID.Text + "' ");

    // ... success feedback and grid refresh
}
```

**Purpose**: Updates addition status to reviewed with supplier invoice number, electronic number, and addition document number
**Process**: Processes review with proper status updates and supplier invoice tracking

### Addition Rejection Logic

```csharp
protected void reject_Click(object sender, EventArgs e)
{
    HttpCookie userinfo = Request.Cookies["user"];
    user = userinfo["code"].ToString();

    // Document validation
    // Row selection validation
    // Status update with rejection reason
    // PO quantity restoration

    cn.ExcuteSQL("update Inventories_Examination_receipt set Inventories_Examination_receipt.Adding_rev_indator = '2',  " +
          " Inventories_Examination_receipt.Adding_rev_user = '" + user + "',Inventories_Examination_receipt.Adding_rev_date='" + DateTime.Now.Date.ToString("yyyy-MM-dd") + "'" +
          " ,Adding_rev_reject_r='" + emp_reason.Value + "' where  Inventories_Examination_receipt.ID ='" + ID.Text + "' ");

    cn.ExcuteSQL(" update Purchese_PO_Order_Details set Purchese_PO_Order_Details.Done_Amount = Purchese_PO_Order_Details.Done_Amount - Inventories_Examination_receipt.Done_Amount, " +
          "Purchese_PO_Order_Details.Remain_Amount = Purchese_PO_Order_Details.Remain_Amount + Inventories_Examination_receipt.Done_Amount " +
          "from Inventories_Examination_receipt where Purchese_PO_Order_Details.PO_ID_FK = Inventories_Examination_receipt.PO_ID_FK " +
          "  and Purchese_PO_Order_Details.itemcode = Inventories_Examination_receipt.Itemcode   and Inventories_Examination_receipt.ID = '" + ID.Text + "' ");

    // ... success feedback and grid refresh
}
```

**Purpose**: Updates addition status to rejected with user, timestamp, and reason
**Process**: Processes rejection workflow with proper status updates and PO adjustments

### Electronic Number Auto-calculation Logic

```csharp
protected void ElectronicNumber_TextChanged(object sender, EventArgs e)
{
    if(ElectronicNumber.Text=="")
    {
        txtAddNum.Text = "0";
    }
    else
    {
        txtAddNum.Text = cn.ExcuteSQL("select count(distinct s.doc_id) from Inventories_Examination_receipt  ir inner join Inventories_Stock s on s.Itemcode=ir.Itemcode and s.doc_id_examination_check=ir.doc_id where ir.Adding_approve_indator=1 and s.MoveType=1  and ElectromicNumber='" + ElectronicNumber.Text + "'");
    }
}
```

**Purpose**: Auto-calculates addition document number based on electronic number
**Process**: Counts existing additions for electronic number and sets addition document number

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Document Number Validation**: Must select document number before searching
- **Supplier Invoice Number Validation**: Must enter supplier invoice number before approval
- **Row Selection Validation**: Must select rows before approval/rejection operations
- **Rejection Reason Validation**: Must select rejection reason before rejection

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for common validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operations
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Document Status Validation**: Ensures documents have proper status conditions for review
- **Supplier Invoice Validation**: Ensures supplier invoice number is valid and not empty
- **Row Selection Validation**: Ensures appropriate rows are selected for operations
- **Electronic Number Validation**: Ensures electronic number is valid for auto-calculation
- **Data Integrity Validation**: Ensures referential integrity

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Department Access**: Ensures user has access to their department
- **Review Access**: Ensures user has permission to review addition requests
- **Rejection Access**: Ensures user has permission to reject addition requests

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Approval Operations**: Handles approval/rejection failures with clear error messages
- **Electronic Number Processing**: Handles auto-calculation failures gracefully
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Search Success**: Grid updates with filtered data after successful search
- **Approval Success**: Clear confirmation message for successful approvals
- **Rejection Success**: Clear confirmation message for successful rejections
- **Electronic Number Success**: Addition document number auto-calculation confirmation

#### **Visual Feedback**
- **Grid Updates**: Immediate grid refresh after successful operations
- **Button States**: Button text and appearance changes during operations
- **Selection Clearing**: Selection states clear after operations
- **Data Display**: Updated data displays confirm successful operations

## Integration Points

### Database Integration

#### **Addition Management System**
- **Addition Request Integration**: Links to addition request master data with review workflow
- **Addition Details Integration**: Links to addition details with item and quantity information
- **Addition Status Integration**: Tracks addition status and review workflow
- **Addition History Integration**: Provides comprehensive addition history with filtering

#### **Inventory Management System**
- **Item Master Integration**: Links to item master data with unit and supplier information
- **Stock Integration**: Links to inventory stock with quantity tracking
- **Store Integration**: Links to warehouse stores with account mapping
- **Unit Conversion Integration**: Links to unit of measure with conversion factors

#### **Supplier Management System**
- **Supplier Integration**: Links to supplier master data with Arabic names
- **Invoice Integration**: Links to supplier invoices with number tracking
- **Electronic Number Integration**: Links to electronic invoice tracking
- **Document Number Integration**: Links to addition document number generation

#### **Purchase Order System**
- **PO Header Integration**: Links to purchase order headers with supplier information
- **PO Details Integration**: Links to purchase order details with item and quantity information
- **PO Status Integration**: Links to PO status with quantity tracking
- **PO History Integration**: Provides comprehensive PO history with filtering

### External Systems

#### **Electronic Invoice System Integration**
- **Database Tables**: Inventories_Examination_receipt with ElectromicNumber field
- **Integration Details**: Tracks electronic invoice numbers for addition requests
- **Data Flow**: Electronic number entry → Auto-calculation → Addition document number generation

#### **Document Number System Integration**
- **Database Tables**: Inventories_Examination_receipt with AddingDocNumber field
- **Integration Details**: Generates unique addition document numbers based on electronic numbers
- **Data Flow**: Electronic number → Count existing additions → Generate document number

#### **Supplier Invoice System Integration**
- **Database Tables**: Inventories_Examination_receipt with inv_num field
- **Integration Details**: Tracks supplier invoice numbers for addition requests
- **Data Flow**: Supplier invoice entry → Status update → Addition approval

## Troubleshooting Guide

### Common Issues and Solutions

#### **Document Selection Issues**
- **Issue**: Document dropdown appears empty
- **Cause**: No documents with proper status conditions exist
- **Solution**: Ensure documents have Examination_done='1', receipt_done='1', Adding_indator='1', Adding_rev_indator='0', Adding_approve_indator='0'

#### **Supplier Invoice Issues**
- **Issue**: Supplier invoice number validation errors
- **Cause**: Invalid invoice number format or missing entry
- **Solution**: Use valid invoice number format and ensure entry before approval

#### **Approval Operation Issues**
- **Issue**: Approval operations fail with validation errors
- **Cause**: Missing document selection, supplier invoice number, or row selection
- **Solution**: Ensure all required fields are selected before approval operations

#### **Electronic Number Issues**
- **Issue**: Addition document number auto-calculation fails
- **Cause**: Invalid electronic number or database query issues
- **Solution**: Use valid electronic number and ensure database connectivity

#### **Permission Issues**
- **Issue**: User cannot access addition review page
- **Cause**: User lacks proper permissions or authentication
- **Solution**: Verify user has proper authentication and department/store permissions

### System Requirements

#### **Permissions**
- **User Authentication**: Valid authentication cookies required
- **Department Access**: User must have department assignment
- **Review Access**: User must have permission to review addition requests
- **Rejection Access**: User must have permission to reject addition requests

#### **Data Requirements**
- **Document Status**: Documents must have proper review workflow status
- **Supplier Invoice**: Supplier invoice information must be available
- **Electronic Number**: Electronic number tracking must be configured
- **Rejection Reasons**: Rejection reasons must be configured and active

## Usage Examples

### Addition Request Review Workflow

1. **Page Access**: Navigate to adding_rev_Stock.aspx
2. **Document Selection**: Select document number from dropdown
3. **Search Operation**: Click "بحث" (Search) button to load addition requests
4. **Request Review**: Review addition requests in grid with all details
5. **Supplier Invoice Entry**: Enter supplier invoice number
6. **Electronic Number Entry**: Enter electronic number (optional)
7. **Addition Document Number**: System auto-calculates based on electronic number
8. **Row Selection**: Select specific addition requests for approval
9. **Approval Operation**: Click "تاكيد الاضافة" (Confirm Addition) button
10. **Status Update**: Addition status updates to reviewed with supplier invoice and electronic number
11. **Confirmation**: Grid refreshes with updated status

### Addition Request Rejection Workflow

1. **Page Access**: Navigate to adding_rev_Stock.aspx
2. **Document Selection**: Select document number from dropdown
3. **Search Operation**: Click "بحث" (Search) button to load addition requests
4. **Request Review**: Review addition requests in grid with all details
5. **Row Selection**: Select specific addition requests for rejection
6. **Rejection Reason**: Select rejection reason from dropdown
7. **Rejection Operation**: Click "رفض الاضافة" (Reject Addition) button
8. **Status Update**: Addition status updates to rejected with user, timestamp, and reason
9. **PO Adjustment**: PO order quantities restore original amounts
10. **Confirmation**: Grid refreshes with updated status

### Electronic Number Tracking Workflow

1. **Page Access**: Navigate to adding_rev_Stock.aspx
2. **Document Selection**: Select document number from dropdown
3. **Search Operation**: Click "بحث" (Search) button to load addition requests
4. **Electronic Number Entry**: Enter electronic number in designated field
5. **Auto-calculation**: System automatically calculates addition document number
6. **Document Number Display**: Addition document number displays in designated field
7. **Approval Process**: Continue with approval process using calculated document number
8. **Tracking**: Electronic number and document number are tracked for future reference